import { daysToMinutes } from './utils';

export default class SSRSettings {
  // "Learning" constants
  // the number of steps and minutes until graduating from the learning phase
  learningSteps: number[]; // minute
  // the interval after graduating from 'learning' to 'reviewing'
  graduatingInterval: number;
  // if the card is marked as 'easy' it automatically graduates to 'reviewing' and is given this new interval
  easyInterval: number;

  // "Reviewing" constants
  // The easyBonus factor is used to scale the interval after grading a card as 'easy'
  easyBonus: number;
  // The intervalModifier changes all 'reviewing' interval calculations by a fixed factor. It can make things globally easier or harder
  intervalModifier: number;
  // The card.easeFactor initial state is startingEaseFactor
  startingEaseFactor: number;
  // the card.easeFactor changes based on how the user grades the card
  againPenalty: number;
  hardPenalty: number;
  easyReward: number;
  // the hardEaseFactor is a constant of 1.2 and is used instead of the card.easeFactor when the user grades a 'reviewing' card as hard
  hardEaseFactor: number;
  // the newReviewingIntervalPenalty is a penalty on the interval when a card slips from 'reviewing' to 'relearning'
  newReviewingIntervalPenalty: number;

  // "Relearning" constants
  // analogous to the learningSteps
  relearningSteps: number[]; // minute

  // mins and maxes to short circuit anki's algorithm at extremes
  maximumInterval: number;
  minimumInterval: number;
  minimumEaseFactor: number;

  static get standard(): Readonly<SSRSettings> {
    return singleton;
  }

  constructor({
    learningSteps,
    graduatingInterval,
    easyInterval,
    easyBonus,
    intervalModifier,
    startingEaseFactor,
    againPenalty,
    hardPenalty,
    easyReward,
    hardEaseFactor,
    newReviewingIntervalPenalty,
    maximumInterval,
    minimumInterval,
    minimumEaseFactor,
    relearningSteps,
  }: Partial<SSRSettings> = {}) {
    this.learningSteps = learningSteps ?? [1, 10];
    this.graduatingInterval = graduatingInterval ?? daysToMinutes(1);
    this.easyInterval = easyInterval ?? daysToMinutes(4);
    this.easyBonus = easyBonus ?? 1.3;
    this.intervalModifier = intervalModifier ?? 1.9;
    this.startingEaseFactor = startingEaseFactor ?? 1.3;
    this.againPenalty = againPenalty ?? -0.2;
    this.hardPenalty = hardPenalty ?? -0.15;
    this.easyReward = easyReward ?? 0.15;
    this.hardEaseFactor = hardEaseFactor ?? 1.2;
    this.newReviewingIntervalPenalty = newReviewingIntervalPenalty ?? 0.5;
    this.maximumInterval = maximumInterval ?? daysToMinutes(36500);
    this.minimumInterval = minimumInterval ?? daysToMinutes(1);
    this.minimumEaseFactor = minimumEaseFactor ?? 1.3;
    this.relearningSteps = relearningSteps ?? [10];
  }
}

const singleton: Readonly<SSRSettings> = new SSRSettings();
