import { NativeNumber } from '../number/NativeNumber';
import { SinoNumber } from '../number/SinoNumber';
import { type CounterObject, type Countable, counters } from './counters';
import pluralize from 'pluralize';

// TODO known issues:
// 1) write a utility to conjugate object particle correctly for example sentences
// 2) add a countable/uncountable flag to force singular for # counters of countable pattern
// 3) pulled example sentences from https://www.90daykorean.com/korean-counters/ as lorem ipsum. change them up!
// 4) make a safer api for the Counter class

/*
the general pattern for counters depends on the type of number ('native' or 'sino')

native:
item + modified native + counter
피자 한 조각 (or less commonly: 피자 1조각)
OR
modified native number + counter

sino:
sino number + counter
오 분 (or equivalently: 5분)

Furthermore, there are at least four situations:
1) Both English and Korean use counters with another noun
- 피자 두 조각 two slices of pizza

2) The counter is, itself, the noun
세 번 3 times

3) Korean uses counters with a separate noun, English only uses the noun
고약이 2마리 two cats, NOT two cat animals
나무 열 그루 10 trees, NOT 10 tree things

4) Even when English does have an equivalent counter:
3a) English doesn't include the counter if the noun is countable (countable: 2 chairs, uncountable: furniture):
  '두 개' (2 things) | '사과 두 개' '2 apples' NOT '2 apples thing'
English does include the counter if the item is uncountable
  '두 장' (two sheets) | '종이 두 장' '2 sheets of paper'
*/

export default class Counter {
  #counter: CounterObject;
  #countable: Countable;
  #number: NativeNumber | SinoNumber;
  #countableKoreanItem: string | undefined;
  #countableEnglishItem: string | undefined;

  // would be nicer to overload this...
  constructor({
    counter,
    counterName,
    disambiguation,
  }: {
    counter?: CounterObject;
    counterName?: string;
    disambiguation?: number;
  }) {
    if (counterName) {
      this.#counter = this.#calculateCounter(counterName, disambiguation);
    } else if (counter) {
      this.#counter = counter;
    } else {
      throw new Error('counter or counterName is required');
    }

    // get a random example to be used with that counter
    const countablesPot = this.#counter.examples;
    if (!countablesPot || !countablesPot.length)
      throw new Error(`No examples for counter "${this.#counter.counterKo}".`);

    this.#countable = countablesPot[Math.floor(Math.random() * countablesPot.length)];

    // get a random noun to be used in that example
    if (this.#countable.countable) {
      let noun = this.#countable.countable[Math.floor(Math.random() * this.#countable.countable.length)];
      this.#countableKoreanItem = noun.Ko;
      this.#countableEnglishItem = noun.En;
    }

    // create a random HangulNumber to be used in that example
    const range = this.#countable.range;
    const num =
      this.#counter.numberType === 'native' ? new NativeNumber('counter') : new SinoNumber('counter');
    if (range) num.range = range;
    this.#number = num;
  }

  #calculateCounter(counterName: string, disambiguation?: number): CounterObject {
    // get the counter
    const counterResults = counters[counterName];
    let potCounter: CounterObject;
    if (Array.isArray(counterResults)) {
      if (disambiguation === undefined) throw new Error(`disambiguation for ${counterName} is required`);
      potCounter = counterResults[disambiguation];
    } else {
      potCounter = counterResults;
    }
    if (!potCounter) throw new Error(`counterName "${counterName}${disambiguation ?? ''}" not found.`);
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
    return this.#countable.createExampleKo(this.counterKo, this.#number, this.countableKo);
  }
  get exampleEn(): string {
    return this.#countable.createExampleEn(
      pluralize(this.counterEn, this.#number.number),
      this.#number,
      this.countableEn ? pluralize(this.countableEn, this.#number.number) : undefined
    );
  }
}
