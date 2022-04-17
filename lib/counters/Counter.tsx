import { NativeNumber } from '../number/NativeNumber';
import { SinoNumber } from '../number/SinoNumber';
import { type CounterObject, type CounterExample, allCounters as counters } from './counters';
import pluralize from 'pluralize';

/* Cases for counters (measure words)
1) Counters must be used with a number and no other noun. Counter && !Noun
This is the same as in English and it's not included in this tool
수영장 50미터이다. A swimming pool is 50 meters.
세 번 3 times

2) Counter can be used by itself with a number OR with another noun and number. Counter && Noun || Counter && !Noun
a) If the English word is an uncountable noun (juice, pizza, rice), the counter word is used (not using it changes the meaning)
두 병         two bottles
주스 두 병    two bottles of juice
두 조각       two slices
피자 두 조각  two slices of pizza
두 장        two sheets
종이 두 장    2 sheets of paper

b) If the English word is a countable noun, the counter word is NOT used in English.
두 개            two things
사과 두 개       '2 apples' NOT '2 things of apple'

3) Counter is not used by itself. Must be with another noun and number. Counter && Noun
I can't think of any counters in English that aren't usable by themselves
고약이           cat
동물             animal
마리             animal counter
고야이 2마리      two cats (NOT two cat animals)
두 마리의 동물    two animals (NOT two animal counter animals)
나무 열 그루      10 trees, NOT 10 tree things

Each counter has either sino or native numbers associated with it
The general structure is item? & sino | modified native number & counter

native:
피자 한 조각 (or less commonly: 피자 1조각)
2 slices of pizza
두 조각
2 slices

sino:
(item) + modified native number + counter
불고기 삼 인분 (or commonly: 불고기 3인분)
3 servings of bulgogi
삼 인분
3 servings
*/

/*
TODO:
1) write a utility to check for 받침 and add appropriate object or subject particle. (check out the hangul jamo?)
2) pluralize pairs of * to pairs of *
3) pulled some example sentences from https://www.90daykorean.com/korean-counters/ as lorem ipsum. change them up!
4) make a safer api for the Counter class
  - should overload as counter | counterName & disambiguation instead of making all optional and throwing an error
5) extend the SinoNumber api to include more precision instead of just order of magnitude
6) write a more versatile examples creater function
  - include random nouns that aren't related to the noun / measure word / number
*/

export default class Counter {
  #counter: CounterObject;
  #counterExample: CounterExample;
  #number: NativeNumber | SinoNumber;
  #countableKoreanItem: string | undefined;
  #countableEnglishItem: string | undefined;

  // would be nicer to overload this...
  constructor({
    id,
    counter,
    counterKo,
    disambiguation,
  }: {
    id?: string;
    counter?: CounterObject;
    counterKo?: string;
    disambiguation?: {
      counterEn?: string;
      numberType?: 'native' | 'sino';
    };
  }) {
    if (id) {
      const counterResult = counters.find(c => c.id === id);
      if (!counterResult) throw new Error(`counterID ${id} not found.`);
      this.#counter = counterResult;
    } else if (counterKo) {
      this.#counter = this.#calculateCounter(counterKo, disambiguation);
    } else if (counter) {
      this.#counter = counter;
    } else {
      throw new Error('id, counter, or counterKo is required');
    }

    // get a random example to be used with that counter
    const countablesPot = this.#counter.examples;
    if (!countablesPot || !countablesPot.length)
      throw new Error(`No examples for counter "${this.#counter.counterKo}".`);

    this.#counterExample = countablesPot[Math.floor(Math.random() * countablesPot.length)];

    // get a random noun to be used in that example
    if (this.#counterExample.countable) {
      let noun =
        this.#counterExample.countable[Math.floor(Math.random() * this.#counterExample.countable.length)];
      this.#countableKoreanItem = noun.Ko;
      this.#countableEnglishItem = noun.En;
    }

    // create a random HangulNumber to be used in that example
    const range = this.#counterExample.range;
    const num =
      this.#counter.numberType === 'native' ? new NativeNumber('counter') : new SinoNumber('counter');
    if (range) num.range = range;
    this.#number = num;
  }

  #calculateCounter(
    counterKo: string,
    disambiguation?: {
      counterEn?: string;
      numberType?: 'native' | 'sino';
    }
  ): CounterObject {
    // get the counter
    const counterResults = counters.filter(c => c.counterKo === counterKo);
    if (counterResults.length === 1) return counterResults[0];
    if (counterResults.length === 0) throw new Error(`Counter "${counterKo}" not found.`);
    const { counterEn, numberType } = disambiguation ?? {};
    if (!counterEn && !numberType)
      throw new Error(`Counter "${counterKo}" has multiple entries. Disambiguation required.`);
    const potCounter =
      counterResults.find(c => c.counterEn === counterEn) ??
      counterResults.find(c => c.numberType === numberType);
    if (!potCounter)
      throw new Error(`counterKo "${counterKo}${JSON.stringify(disambiguation) ?? ''}" not found.`);
    return potCounter;
  }

  get counterKo(): string {
    return this.#counter.counterKo;
  }
  get counterEn(): string {
    return this.#counter.counterEn;
  }
  get desc(): string {
    return this.#counter.desc;
  }
  get numberType(): string {
    return this.#counter.numberType;
  }
  get countableKo(): string | undefined {
    return this.#countableKoreanItem;
  }
  get countableEn(): string | undefined {
    return this.#countableEnglishItem;
  }
  get exampleKo(): string {
    return this.#counterExample.createExampleKo(this.counterKo, this.#number, this.countableKo);
  }
  get exampleEn(): string {
    return this.#counterExample.createExampleEn(
      pluralize(this.counterEn, this.#number.number),
      this.#number,
      this.countableEn ? pluralize(this.countableEn, this.#number.number) : undefined
    );
  }
  toObject() {
    return {
      countableEn: this.countableEn,
      countableKo: this.countableKo,
      counterEn: this.counterEn,
      counterKo: this.counterKo,
      desc: this.desc,
      exampleEn: this.exampleEn,
      exampleKo: this.exampleKo,
      numberType: this.numberType,
    };
  }
}
