/* This is based off Anki's algorithm, which is in turn based on SM-2
 * This video and blog post explain how Anki works and the setting details: https://www.youtube.com/watch?v=lz60qTP2Gx0 https://refold.la/roadmap/stage-1/a/anki-setup#Recommended-Options-Settings
 * A python version was referenced here: https://gist.github.com/riceissa/1ead1b9881ffbb48793565ce69d7dbdd
 */

import { getFudge, roundToTwo, addMinutes, mergeSortByDueDate } from './utils';
import SRSettings from './SRSettings';
import { Overwrite } from 'utility-types';
import cuid from 'cuid';
import { SpacedRepetition } from '@prisma/client';

/* #################### TYPES #################### */
// The card.status is 'learning' when the card is new and hasn't been seen enough times to graduate to 'reviewing'
// 'reviewing' is where the card spends most of its life
// 'relearning' happens when the user marks a card as 'again' (they got the answer wrong). It goes through a similar phase to 'learning' before regraduating to 'reviewing'
export type Status = 'learning' | 'reviewing' | 'relearning';

// The user grades the card which determines the card's future placement in the deck
export type LearningGrade = 'again' | 'good' | 'easy';
export type ReviewingGrade = 'again' | 'hard' | 'good' | 'easy';
export type RelearningGrade = 'again' | 'good';

type MarkHistory = { date: string; prevStatus: Status; updatedStatus: Status; grade: ReviewingGrade };
export type SRObject = Overwrite<SpacedRepetition, { markHistory: MarkHistory[] }>;

export default class SR {
  status: Status;
  // stepsIndex is how far along the card is in the learning or relearning phase before it graduates to 'reviewing'
  stepsIndex: number;
  // easeFactor determines how the interval is calculated until the next review
  easeFactor: number;
  // interval is the number of days between reviews
  interval: number;
  due: string;
  createdAt: string;
  settings: SRSettings;
  #markHistory: MarkHistory[];
  id: string;
  dataId: string;
  userId: string;

  static sort = (arr: SR[]): SR[] => {
    return mergeSortByDueDate(arr);
  };

  static next = (arr: SR[]): SR | null => {
    const potNext = arr.reduce((acc, cur): SR => (cur.due < acc.due ? cur : acc));
    return new Date(potNext.due) > new Date() ? null : potNext;
  };

  static isDueSooner = (a: SR, b: SR): 1 | -1 => (a.due < b.due ? 1 : -1);

  static fromObject(data: SRObject): SR {
    const restore = { ...data, markHistory: JSON.stringify(data.markHistory) };
    return new SR({ restore });
  }

  static fromDBModel(data: SpacedRepetition) {
    return new SR({ restore: data });
  }

  constructor({ restore, settings }: { restore?: SpacedRepetition; settings?: Partial<SRSettings> } = {}) {
    if (restore?.status && !['learning', 'reviewing', 'relearning'].includes(restore.status))
      throw new Error('Invalid status');

    this.status = (restore?.status as 'learning' | 'reviewing' | 'relearning') ?? 'learning';
    this.stepsIndex = restore?.stepsIndex ?? 0;
    this.interval = restore?.interval ?? 0;
    this.due = restore?.due ?? new Date().toISOString();
    this.createdAt = restore?.createdAt ?? new Date().toISOString();
    this.settings = settings ? new SRSettings(settings) : SRSettings.standard;
    this.easeFactor = restore?.easeFactor ?? this.settings.startingEaseFactor;
    this.id = restore?.id ?? cuid();
    this.dataId = restore?.dataId ?? '';
    this.userId = restore?.userId ?? '';

    if (!restore) {
      this.#markHistory = [];
    } else {
      this.#markHistory = JSON.parse(restore.markHistory) as MarkHistory[];
    }
  }

  // Learning is the first phase a card will see.
  // It has grades of 'again' | 'good' | 'easy'
  // The easeFactor of a card is not affected while learning
  #updateLearning(grade: LearningGrade): void {
    // If the user grades 'again' at any point while learning, the card.stepsIndex reverts to 0 and card.due is in learningSteps[0] minutes from now
    if (grade === 'again') {
      this.stepsIndex = 0;
      this.due = addMinutes(this.settings.learningSteps[this.stepsIndex], this.due);
    } else if (grade === 'good') {
      // If the user grades 'good', the card.stepsIndex moves up one. So it is now up for review in learningSteps[1]

      this.stepsIndex += 1;
      if (this.stepsIndex < this.settings.learningSteps.length) {
        this.due = addMinutes(this.settings.learningSteps[this.stepsIndex], this.due);
      } else {
        // If the user grades 'good' learningSteps.length times, the card.status "graduates" from 'learning' to 'reviewing' and has a card.due of graduatingInterval from now
        this.status = 'reviewing';
        this.stepsIndex = 0;
        this.interval = this.settings.graduatingInterval;
        this.due = addMinutes(this.interval, this.due);
      }
    } else if (grade === 'easy') {
      // If the user grades 'easy' it will bypass all the learningSteps intervals, graduate it to 'reviewing', and have a card.due of easyInterval from now
      this.status = 'reviewing';
      this.stepsIndex = 0;
      this.interval = this.settings.easyInterval;
      this.due = addMinutes(this.settings.easyInterval, this.due);
    }
  }

  // Reviewing. When a card.status is 'reviewing', the intervals are determined by the card.easeFactor
  // The ease factor will rise or fall with grades of 'easy' or 'again'
  #updateReviewing(grade: ReviewingGrade): void {
    if (grade === 'again') {
      // the card slips from 'reviewing' to 'relearning'
      // the easeFactor and interval are recalculated with penalties
      this.status = 'relearning';
      this.stepsIndex = 0;
      this.easeFactor = roundToTwo(
        Math.max(this.settings.minimumEaseFactor, this.easeFactor + this.settings.againPenalty)
      );
      this.interval = Math.round(
        Math.max(this.settings.minimumInterval, this.interval * this.settings.newReviewingIntervalPenalty)
      );
      this.due = addMinutes(this.settings.relearningSteps[0], this.due);
      return;
    }

    // if the grade is easy, it gets a bonus
    if (grade === 'easy') {
      this.easeFactor = roundToTwo(this.easeFactor + this.settings.easyBonus);
    }

    this.due = addMinutes(Math.min(this.settings.maximumInterval, this.interval) * getFudge(), this.due);
  }

  // Relearning has steps to pass before graduating like the learning phase.
  // Differences: It only has grades of 'again' and 'good'. The easeFactor IS affected by a grade of 'again'
  #updateRelearning(grade: RelearningGrade): void {
    if (grade === 'again') {
      this.stepsIndex = 0;
      this.easeFactor = roundToTwo(
        Math.max(this.settings.minimumEaseFactor, this.easeFactor + this.settings.againPenalty)
      );
      this.due = addMinutes(this.settings.relearningSteps[0], this.due);
    } else if (grade === 'good') {
      this.stepsIndex += 1;
      if (this.stepsIndex < this.settings.relearningSteps.length) {
        this.due = addMinutes(this.settings.relearningSteps[this.stepsIndex], this.due);
      } else {
        this.status = 'reviewing';
        this.stepsIndex = 0;
        // the newReviewingIntervalPenalty was applied when it fell from 'reviewing' to 'relearning'
        (this.due = addMinutes(this.interval)), this.due;
      }
    }
  }

  mark = (grade: ReviewingGrade): void => {
    if (grade === 'hard' && (this.status === 'learning' || this.status === 'relearning'))
      throw new Error(`Invalid grade ${grade} for ${this.status} card`);
    if (grade === 'easy' && this.status === 'relearning')
      throw new Error(`Invalid grade ${grade} for ${this.status} card`);

    const prevStatus = this.status;

    if (this.status === 'learning') this.#updateLearning(grade as LearningGrade);
    else if (this.status === 'reviewing') this.#updateReviewing(grade);
    else if (this.status === 'relearning') this.#updateRelearning(grade as RelearningGrade);

    this.#markHistory.push({
      date: new Date().toISOString(),
      prevStatus,
      updatedStatus: this.status,
      grade,
    });
  };

  toObject(): SRObject {
    return {
      id: this.id,
      status: this.status,
      stepsIndex: this.stepsIndex,
      interval: this.interval,
      due: this.due,
      createdAt: this.createdAt,
      easeFactor: this.easeFactor,
      markHistory: this.#markHistory,
      userId: this.userId,
      dataId: this.dataId,
    };
  }

  toDBModel(): SpacedRepetition {
    return {
      id: this.id,
      status: this.status,
      stepsIndex: this.stepsIndex,
      interval: this.interval,
      due: this.due,
      createdAt: this.createdAt,
      easeFactor: this.easeFactor,
      markHistory: JSON.stringify(this.#markHistory),
      userId: this.userId,
      dataId: this.dataId,
    };
  }

  // https://github.com/microsoft/TypeScript/issues/37487
  get markHistory(): ReadonlyArray<MarkHistory> {
    return [...this.#markHistory];
  }

  get markOptions(): ('again' | 'hard' | 'good' | 'easy')[] {
    if (this.status === 'learning') return ['again', 'good', 'easy'];
    if (this.status === 'reviewing') return ['again', 'hard', 'good', 'easy'];
    if (this.status === 'relearning') return ['again', 'good'];
    throw new Error(`Invalid status ${this.status}`);
  }
}
