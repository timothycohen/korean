/* This is based off Anki's algorithm, which is in turn based on SM-2
 * This video and blog post explain how Anki works and the setting details: https://www.youtube.com/watch?v=lz60qTP2Gx0 https://refold.la/roadmap/stage-1/a/anki-setup#Recommended-Options-Settings
 * A python version was referenced here: https://gist.github.com/riceissa/1ead1b9881ffbb48793565ce69d7dbdd
 */

import { getFudge, roundToTwo, addMinutes } from './utils';
import SSRSettings from './SSRSettings';

/* #################### TYPES #################### */
// The card.status is 'learning' when the card is new and hasn't been seen enough times to graduate to 'reviewing'
// 'reviewing' is where the card spends most of its life
// 'relearning' happens when the user marks a card as 'again' (they got the answer wrong). It goes through a similar phase to 'learning' before regraduating to 'reviewing'
type Status = 'learning' | 'reviewing' | 'relearning';

// The user grades the card which determines the card's future placement in the deck
type LearningGrade = 'again' | 'good' | 'easy';
type ReviewingGrade = 'again' | 'hard' | 'good' | 'easy';
type RelearningGrade = 'again' | 'good';

type MarkHistory = { date: Date; prevStatus: Status; updatedStatus: Status; grade: ReviewingGrade };

export default class SSR {
  #status: Status;
  // stepsIndex is how far along the card is in the learning or relearning phase before it graduates to 'reviewing'
  #stepsIndex: number;
  // easeFactor determines how the interval is calculated until the next review
  #easeFactor: number;
  // interval is the number of days between reviews
  #interval: number;
  #due: Date;
  #createdAt: Date;
  private readonly _markHistory: MarkHistory[];
  #settings: SSRSettings;

  constructor(settings?: Partial<SSRSettings>) {
    this.#status = 'learning';
    this.#stepsIndex = 0;
    this.#interval = 0;
    this.#due = new Date();
    this.#createdAt = new Date();
    this._markHistory = [];
    this.#settings = settings ? new SSRSettings(settings) : SSRSettings.standard;
    this.#easeFactor = this.#settings.startingEaseFactor;
  }

  // Learning is the first phase a card will see. The easeFactor of a card is not affected while learning
  #updateLearning(grade: LearningGrade): void {
    // If the user grades 'again' at any point while learning, the card.stepsIndex reverts to 0 and card.due is in learningSteps[0] minutes from now
    if (grade === 'again') {
      this.#stepsIndex = 0;
      this.#due = addMinutes(this.#settings.learningSteps[this.#stepsIndex]);
    } else if (grade === 'good') {
      // If the user grades 'good', the card.stepsIndex moves up one. So it is now up for review in learningSteps[1]

      this.#stepsIndex += 1;
      if (this.#stepsIndex < this.#settings.learningSteps.length) {
        this.#due = addMinutes(this.#settings.learningSteps[this.#stepsIndex]);
      } else {
        // If the user grades 'good' learningSteps.length times, the card.status "graduates" from 'learning' to 'reviewing' and has a card.due of graduatingInterval from now
        this.#status = 'reviewing';
        this.#stepsIndex = 0;
        this.#interval = this.#settings.graduatingInterval;
        this.#due = addMinutes(this.#interval);
      }
    } else if (grade === 'easy') {
      // If the user grades 'easy' it will bypass all the learningSteps intervals, graduate it to 'reviewing', and have a card.due of easyInterval from now
      this.#status = 'reviewing';
      this.#stepsIndex = 0;
      this.#interval = this.#settings.easyInterval;
      this.#due = addMinutes(this.#settings.easyInterval);
    }
  }

  // Reviewing. When a card.status is 'reviewing', the intervals are determined by the card.easeFactor
  #updateReviewing(grade: ReviewingGrade): void {
    if (grade === 'again') {
      // the card slips from 'reviewing' to 'relearning'
      // the easeFactor and interval are recalculated with penalties
      this.#status = 'relearning';
      this.#stepsIndex = 0;
      this.#easeFactor = roundToTwo(
        Math.max(this.#settings.minimumEaseFactor, this.#easeFactor + this.#settings.againPenalty)
      );
      this.#interval = Math.round(
        Math.max(this.#settings.minimumInterval, this.#interval * this.#settings.newReviewingIntervalPenalty)
      );
      this.#due = addMinutes(this.#settings.relearningSteps[0]);
      return;
    }
    if (grade === 'hard') {
      this.#easeFactor = roundToTwo(
        Math.max(this.#settings.minimumEaseFactor, this.#easeFactor + this.#settings.hardPenalty)
      );
      this.#interval = Math.round(
        this.#interval * this.#settings.intervalModifier * this.#settings.hardEaseFactor
      );
    } else if (grade === 'good') {
      this.#interval = Math.round(this.#interval * this.#settings.intervalModifier * this.#easeFactor);
    } else if (grade === 'easy') {
      this.#easeFactor = roundToTwo(this.#easeFactor + this.#settings.easyReward);
      this.#interval = Math.round(
        this.#interval * this.#settings.intervalModifier * this.#easeFactor * this.#settings.easyBonus
      );
    }
    this.#due = addMinutes(Math.min(this.#settings.maximumInterval, this.#interval) * getFudge());
  }

  // Relearning has steps to pass before graduating like the learning phase.
  // Differences: It only has grades of 'again' and 'good'. The easeFactor IS affected by a grade of 'again'
  #updateRelearning(grade: RelearningGrade): void {
    if (grade === 'again') {
      this.#stepsIndex = 0;
      this.#easeFactor = roundToTwo(
        Math.max(this.#settings.minimumEaseFactor, this.#easeFactor + this.#settings.againPenalty)
      );
      this.#due = addMinutes(this.#settings.relearningSteps[0]);
    } else if (grade === 'good') {
      this.#stepsIndex += 1;
      if (this.#stepsIndex < this.#settings.relearningSteps.length) {
        this.#due = addMinutes(this.#settings.relearningSteps[this.#stepsIndex]);
      } else {
        this.#status = 'reviewing';
        this.#stepsIndex = 0;
        // the newReviewingIntervalPenalty was applied when it fell from 'reviewing' to 'relearning'
        this.#due = addMinutes(this.#interval);
      }
    }
  }

  mark = (grade: ReviewingGrade): void => {
    if (grade === 'hard' && (this.#status === 'learning' || this.#status === 'relearning'))
      throw new Error(`Invalid grade ${grade} for ${this.#status} card`);
    if (grade === 'easy' && this.#status === 'relearning')
      throw new Error(`Invalid grade ${grade} for ${this.#status} card`);

    const prevStatus = this.#status;

    if (this.#status === 'learning') this.#updateLearning(grade as LearningGrade);
    else if (this.#status === 'reviewing') this.#updateReviewing(grade);
    else if (this.#status === 'relearning') this.#updateRelearning(grade as RelearningGrade);

    this._markHistory.push({ date: new Date(), prevStatus, updatedStatus: this.#status, grade });
  };

  // https://github.com/microsoft/TypeScript/issues/37487
  get status(): Status {
    return this.#status;
  }
  get stepsIndex(): number {
    return this.#stepsIndex;
  }
  get interval(): number {
    return this.#interval;
  }
  get due(): Date {
    return this.#due;
  }
  get createdAt(): Date {
    return this.#createdAt;
  }
  get easeFactor(): number {
    return this.#easeFactor;
  }

  get markHistory(): ReadonlyArray<MarkHistory> {
    return [...this._markHistory];
  }
}
