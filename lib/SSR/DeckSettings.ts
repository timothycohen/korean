export default class DeckSettings {
  newCardsADay: number;
  leechThreshold: number;
  maxReviewsADay: number;
  maxCards: number;
  ignoreAnswerTimesLongerThan: number;

  constructor({
    newCardsADay,
    leechThreshold,
    maxReviewsADay,
    maxCards,
    ignoreAnswerTimesLongerThan,
  }: Partial<DeckSettings> = {}) {
    this.newCardsADay = newCardsADay ?? 10;
    this.leechThreshold = leechThreshold ?? 6;
    this.maxReviewsADay = maxReviewsADay ?? 9999;
    this.maxCards = maxCards ?? 9999;
    this.ignoreAnswerTimesLongerThan = ignoreAnswerTimesLongerThan ?? 60; // seconds // this is to prevent afk time from being counted
  }
}
