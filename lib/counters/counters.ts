import { NativeNumber } from '../number/NativeNumber';
import { SinoNumber } from '../number/SinoNumber';
import { fruits, animals, drinks, clothing } from './countables';
import { relations, shows } from './groupsOfNouns';

export interface CounterExample {
  countable?: { Ko?: string; En?: string }[];
  createExampleKo: (counterKo: string, number: NativeNumber | SinoNumber, countableKo?: string) => string;
  createExampleEn: (counterEn: string, number: NativeNumber | SinoNumber, countableEn?: string) => string;
  range?: [number, number];
}

export interface CounterObject {
  counterKo: string;
  counterEn: string;
  numberType: 'native' | 'sino';
  desc: string;
  examples: CounterExample[];
}

const generalCounters: Record<string, CounterObject | CounterObject[]> = {
  개: {
    counterKo: '개',
    counterEn: 'thing',
    numberType: 'native',
    desc: 'A general counter for things, items, and units. The default counter for most inanimate objects.',
    examples: [
      {
        countable: fruits,
        createExampleKo: (counterKo, number, countableKo): string =>
          `${countableKo} ${number.hangul} ${counterKo} 주세요.`,
        createExampleEn: (counterEn, number, countableEn): string =>
          `${number.formattedNumber} ${countableEn} please.`,
        range: [1, 15],
      },
    ],
  },
  마리: {
    counterKo: '마리',
    counterEn: 'animal',
    numberType: 'native',
    desc: 'A counter used for animals.',
    examples: [
      {
        countable: animals,
        createExampleKo: (counterKo, number, countableKo): string =>
          `${relations[8].Ko}은 ${countableKo}를 ${number.hangul} ${counterKo} 키우고 있어요.`,
        createExampleEn: (counterEn, number, countableEn): string =>
          `My ${relations[8].En} has ${number.formattedNumber} ${countableEn}.`,
        range: [1, 5],
      },
    ],
  },
  권: {
    counterKo: '권',
    counterEn: 'volumes',
    numberType: 'native',
    desc: 'A counter used for books and notebooks.',
    examples: [
      {
        countable: [{ Ko: '책', En: 'book' }],
        createExampleKo: (counterKo, number, countableKo): string =>
          `오늘 도서관에 가서 ${countableKo}을 ${number.hangul} ${counterKo} 빌렸어요.`,
        createExampleEn: (counterEn, number, countableEn): string =>
          `I went to the library and borrowed ${number.formattedNumber} ${countableEn} today.`,
        range: [1, 7],
      },
    ],
  },
  명: {
    counterKo: '명',
    counterEn: 'person',
    numberType: 'native',
    desc: 'A counter used to describe how many people there are.',
    examples: [
      {
        createExampleKo: (counterKo, number): string =>
          `내일 ${number.hangul} ${counterKo} 예약할 수 있을까요?`,
        createExampleEn: (counterEn, number): string =>
          `Can I make a reservation for ${number.formattedNumber} ${counterEn}?`,
        range: [1, 40],
      },
    ],
  },
  사람: {
    counterKo: '사람',
    counterEn: 'person',
    numberType: 'native',
    desc: 'A counter used for people.',
    examples: [
      {
        createExampleKo: (counterKo, number): string =>
          `오늘 모임은 ${number.hangul} ${counterKo}이 더 왔구나!`,
        createExampleEn: (counterEn, number): string =>
          `Today ${number.formattedNumber} more ${counterEn} came!`,
        range: [1, 26],
      },
    ],
  },
  조각: {
    counterKo: '조각',
    counterEn: 'slice',
    numberType: 'native',
    desc: 'A counter used for slices.',
    examples: [
      {
        countable: [{ Ko: '피자', En: 'pizza' }],
        createExampleKo: (counterKo, number, countableKo): string =>
          `${countableKo}를 ${number.hangul} ${counterKo}으로 자르자.`,
        createExampleEn: (counterEn, number, countableEn): string =>
          `Let's cut the ${countableEn} into ${number.formattedNumber} ${counterEn}.`,
        range: [1, 10],
      },
    ],
  },
  장: {
    counterKo: '장',
    counterEn: 'sheet',
    numberType: 'native',
    desc: 'A counter for sheets of paper.',
    examples: [
      {
        countable: [{ Ko: '종이', En: 'paper' }],
        createExampleKo: (counterKo, number, countableKo): string =>
          `${countableKo}가 몇 ${counterKo}이나 필요하세요? ${number.hangul} ${counterKo} 장 주세요.`,
        createExampleEn: (counterEn, number, countableEn): string =>
          `How many ${counterEn} of ${countableEn} do you need? ${number.number} ${counterEn} please.`,
        range: [1, 60],
      },
    ],
  },
  잔: {
    counterKo: '잔',
    counterEn: 'cup',
    numberType: 'native',
    desc: 'A counter for drinks.',
    examples: [
      {
        countable: drinks['coffee'],
        createExampleKo: (counterKo, number, countableKo): string =>
          `오늘 ${countableKo}를 ${number.hangul} ${counterKo} 마셨기 때문에 못 자고 있어요.`,
        createExampleEn: (counterEn, number, countableEn): string =>
          `I can't sleep because I had ${number.formattedNumber} ${counterEn} of ${countableEn}.`,
        range: [1, 6],
      },
    ],
  },
  병: {
    counterKo: '병',
    counterEn: 'bottle',
    numberType: 'native',
    desc: 'A counter for bottles.',
    examples: [
      {
        countable: [{ Ko: '콜라', En: 'cola' }],
        createExampleKo: (counterKo, number, countableKo): string =>
          `마트에 가서 나한테 ${countableKo}를 ${number.hangul} ${counterKo} 사 줘.`,
        createExampleEn: (counterEn, number, countableEn): string =>
          `Go to the store and buy me ${number.formattedNumber} ${counterEn} of ${countableEn}.`,
        range: [1, 6],
      },
    ],
  },
  대: {
    counterKo: '대',
    counterEn: 'car / machine',
    numberType: 'native',
    desc: 'A counter for cars and machines.',
    examples: [
      {
        countable: [{ Ko: '자동차', En: 'car' }],
        createExampleKo: (counterKo, number, countableKo): string =>
          `어제 ${number.hangul} ${countableKo} 두 ${counterKo}를 보고 왔는데, 아주 멋졌어!`,
        createExampleEn: (counterEn, number, countableEn): string =>
          `I saw ${number.number} new ${countableEn} yesterday, and they were really cool!`,
        range: [1, 11],
      },
    ],
  },
  그릇: {
    counterKo: '그릇',
    counterEn: 'bowl',
    numberType: 'native',
    desc: 'A counter for a bowl of something.',
    examples: [
      {
        countable: [{ Ko: '국밥', En: 'rice soup' }],
        createExampleKo: (counterKo, number, countableKo): string =>
          `아줌마, 여기 ${countableKo} ${number.hangul} ${counterKo} 주세요.`,
        createExampleEn: (counterEn, number, countableEn): string =>
          `${number.formattedNumber} ${counterEn} of ${countableEn}, please.`,
        range: [1, 4],
      },
    ],
  },
  채: {
    counterKo: '채',
    counterEn: 'building',
    numberType: 'native',
    desc: 'A counter for houses and buildings.',
    examples: [
      {
        countable: [{ Ko: '아파트', En: 'apartment' }],
        createExampleKo: (counterKo, number, countableKo): string =>
          `부모님이 ${countableKo}를 ${number.hangul} ${counterKo} 마련하셨습니다.`,
        createExampleEn: (counterEn, number, countableEn): string =>
          `My parents bought ${number.number === 1 ? 'an' : number.formattedNumber} ${countableEn}.`,
        range: [1, 3],
      },
    ],
  },
  그루: {
    counterKo: '그루',
    counterEn: 'tree',
    numberType: 'native',
    desc: 'A counter for trees.',
    examples: [
      {
        countable: [{ Ko: '나무', En: 'tree' }],
        createExampleKo: (counterKo, number, countableKo): string =>
          `식목일에 ${countableKo} ${number.hangul} ${counterKo}를 심는 게 목표예요.`,
        createExampleEn: (counterEn, number, countableEn): string =>
          `My goal is to plant ${number.number} ${counterEn} on Arbor Day.`,
        range: [0, 50],
      },
    ],
  },
  벌: {
    counterKo: '벌',
    counterEn: 'piece of clothing',
    numberType: 'native',
    desc: 'A counter for clothes.',
    examples: [
      {
        countable: clothing,
        createExampleKo: (counterKo, number, countableKo): string =>
          `회사를 다니기 위해서 새 ${countableKo}를 ${number.hangul} ${counterKo} 샀어요.`,
        createExampleEn: (counterEn, number, countableEn): string =>
          `I bought ${number.formattedNumber} new ${countableEn} to go to work.`,
        range: [1, 5],
      },
    ],
  },
  켤레: {
    counterKo: '켤레',
    counterEn: 'pair of shoes',
    numberType: 'native',
    desc: 'A counter for pairs of shoes.',
    examples: [
      {
        countable: [{ Ko: '구두', En: 'pair of dress shoes' }],
        createExampleKo: (counterKo, number, countableKo): string =>
          `결혼식을 위해 ${countableKo} ${number.hangul} ${counterKo}를 샀어요.`,
        createExampleEn: (counterEn, number, countableEn): string =>
          `I bought ${number.formattedNumber} new ${countableEn} for the wedding.`,
        range: [1, 3],
      },
    ],
  },

  가지: {
    counterKo: '가지',
    counterEn: 'kind',
    numberType: 'native',
    desc: 'A counter for kinds, varieties, sorts.',
    examples: [
      {
        countable: [{ Ko: '언어', En: 'language' }],
        createExampleKo: (counterKo, number, countableKo): string =>
          `나는 ${number.hangul} ${counterKo} 다른 ${countableKo}를 말할 수 있다.`,
        createExampleEn: (counterEn, number, countableEn): string =>
          `I can speak ${number.formattedNumber} different ${counterEn} of ${countableEn}.`,
        range: [2, 5],
      },
    ],
  },
  군데: {
    counterKo: '군데',
    counterEn: 'place',
    numberType: 'native',
    desc: 'A counter for places.',
    examples: [
      {
        countable: [
          { Ko: '커피숍', En: 'coffee shop' },
          { Ko: '식당', En: 'restaurant' },
        ],
        createExampleKo: (counterKo, number, countableKo): string =>
          `이 근처에 ${countableKo}이 ${number.hangul} ${counterKo} 있어요.`,
        createExampleEn: (counterEn, number, countableEn): string =>
          `There are ${number.formattedNumber} ${countableEn} nearby.`,
        range: [1, 7],
      },
    ],
  },
  번: {
    counterKo: '번',
    counterEn: 'time',
    numberType: 'native',
    desc: 'A counter for number of times.',
    examples: [
      {
        createExampleKo: (counterKo, number, countableKo): string =>
          `그 ${shows[0].Ko}를 ${number.hangul} ${counterKo} 봤어.`,
        createExampleEn: (counterEn, number, countableEn): string =>
          `I've seen that ${shows[0].En} ${number.formattedNumber} ${counterEn}.`,
        range: [1, 5],
      },
    ],
  },
  층: {
    counterKo: '층',
    counterEn: 'floor',
    numberType: 'sino',
    desc: 'A counter for floors in a building.',
    examples: [
      {
        createExampleKo: (counterKo, number, countableKo): string =>
          `건물은 ${number.hangul} ${counterKo}이 있어요.`,
        createExampleEn: (counterEn, number, countableEn): string =>
          `The building has ${number.formattedNumber} ${counterEn}.`,
        range: [1, 1],
      },
    ],
  },
};

const dateAndTimeCounters: Record<string, CounterObject | CounterObject[]> = {
  분: [
    {
      counterKo: '분',
      counterEn: 'person',
      numberType: 'native',
      desc: 'A polite counter used for people.',
      examples: [
        {
          createExampleKo: (counterKo, number): string =>
            `저녁 식사에 총 ${number.hangul} ${counterKo} 맞으세요?`,
          createExampleEn: (counterEn, number): string =>
            `Is it for a total of ${number.formattedNumber} ${counterEn} for dinner?`,
          range: [1, 36],
        },
      ],
    },
    {
      counterKo: '분',
      counterEn: 'minute',
      numberType: 'sino',
      desc: 'A counter for minutes.',
      examples: [
        {
          createExampleKo: (counterKo, number): string =>
            `${number.formattedNumber} ${counterKo}만 이따 전화할게.`,
          createExampleEn: (counterEn, number): string =>
            `I'll call you back in just ${number.formattedNumber} ${counterEn}.`,
          range: [1, 1],
        },
      ],
    },
  ],
  시: {
    counterKo: '시',
    counterEn: 'hour (time)',
    numberType: 'native',
    desc: 'A counter for hours (time).',
    examples: [
      {
        createExampleKo: (counterKo, number, countableKo): string =>
          `지금 ${number.number < 7 ? '오후' : number.number < 7 ? '저녁' : '밤'} ${
            number.hangul
          } ${counterKo}야?`,
        createExampleEn: (counterEn, number, countableEn): string => `Is it ${number.formattedNumber} p.m.?`,
        range: [1, 13],
      },
    ],
  },
  시간: {
    counterKo: '시간',
    counterEn: 'hour',
    numberType: 'native',
    desc: 'A counter for duration in hours.',
    examples: [
      {
        createExampleKo: (counterKo, number, countableKo): string =>
          `만드는 데 ${number.hangul} ${counterKo}이 걸린다.`,
        createExampleEn: (counterEn, number, countableEn): string =>
          `It takes ${number.formattedNumber} ${counterEn} to produce.`,
        range: [1, 21],
      },
    ],
  },
  일: {
    counterKo: '일',
    counterEn: 'day',
    numberType: 'sino',
    desc: 'A counter for days (duration and calendar).',
    examples: [
      {
        createExampleKo: (counterKo, number, countableKo): string =>
          `(${number.hangul}) ${number.number}${counterKo} 후에 봐요.`,
        createExampleEn: (counterEn, number, countableEn): string =>
          `See you in ${number.formattedNumber} ${counterEn}.`,
        range: [1, 1],
      },
      {
        // todo INTL formatter
        // todo range of [1, 31] is currently not possible with sino OOM range API
        createExampleKo: (counterKo, number, countableKo): string => `오늘은 (이) 2일입니다.`,
        createExampleEn: (counterEn, number, countableEn): string => `Today is the 2nd.`,
      },
    ],
  },
  주: {
    counterKo: '주',
    counterEn: 'week',
    numberType: 'sino',
    desc: 'A counter for weeks. The same as 주일',
    examples: [
      {
        createExampleKo: (counterKo, number, countableKo): string =>
          `${number.hangul} ${counterKo} 전에 등록했어요.`,
        createExampleEn: (counterEn, number, countableEn): string =>
          `I signed up ${number.formattedNumber} ${counterEn} ago.`,
        range: [1, 2],
      },
    ],
  },
  월: {
    counterKo: '월',
    counterEn: 'month',
    numberType: 'sino',
    desc: 'A counter for the calendar month.',
    examples: [
      {
        createExampleKo: (counterKo, number, countableKo): string => `그 영화는 (사) 4월에 개봉해요.`,
        createExampleEn: (counterEn, number, countableEn): string => `The movie comes out in April.`,
        range: [0, 1],
      },
    ],
  },
  개월: {
    counterKo: '개월',
    counterEn: 'month',
    numberType: 'sino',
    desc: 'A counter for duration of months.',
    examples: [
      {
        createExampleKo: (counterKo, number, countableKo): string =>
          `저는 한국어를 ${number.hangul} ${counterKo} 동안 공부했습니다.`,
        createExampleEn: (counterEn, number, countableEn): string =>
          `I have studied Korean for ${number.formattedNumber} ${counterEn}.`,
        range: [1, 1],
      },
    ],
  },
  달: {
    counterKo: '달',
    counterEn: 'month',
    numberType: 'native',
    desc: 'A counter for months. Usually used only with small numbers, after which 개월 is preferred.',
    examples: [
      {
        createExampleKo: (counterKo, number, countableKo): string =>
          `${number.hangul} ${counterKo} 전에 한국에 왔어요.`,
        createExampleEn: (counterEn, number, countableEn): string =>
          `I came to Korea ${number.formattedNumber} ${counterEn} ago.`,
        range: [1, 4],
      },
    ],
  },
  년: {
    counterKo: '년',
    counterEn: 'year',
    numberType: 'sino',
    desc: 'A counter for years.',
    examples: [
      {
        createExampleKo: (counterKo, number, countableKo): string =>
          `저는 ${number.hangul} ${counterKo} 동안 한국에 있을 거예요.`,
        createExampleEn: (counterEn, number, countableEn): string =>
          `I will be in Korea for ${number.formattedNumber} ${counterEn}.`,
        range: [1, 1],
      },
    ],
  },
  초: {
    counterKo: '초',
    counterEn: 'second',
    numberType: 'sino',
    desc: 'A counter for seconds.',
    examples: [
      // todo create an example for the clock
      // todo range of [1, 59] is currently not possible with sino OOM range API
      {
        createExampleKo: (counterKo, number, countableKo): string =>
          `그는 정확히 ${number.hangul} ${counterKo}만에 끝났어.`,
        createExampleEn: (counterEn, number, countableEn): string =>
          `He finished in exactly ${number.formattedNumber} ${counterEn}.`,
        range: [1, 2],
      },
    ],
  },
  // 해: {
  //   counterKo: '해',
  //   numberType: 'native',
  //   counterEn: 'year',
  //   desc: `A counter for years. Mostly used in expressions and not with numbers, which is why it hasn't been included.`,
  //   examples: [
  //     {
  //       countable: [{ Ko: '', En: '' }],
  //       createExampleKo: (counterKo, number, countableKo): string => ``
  //       createExampleEn: (counterEn, number, countableEn): string => ``
  //     },
  //   ],
  // },
};

const measureWordIsAlwaysTheNounCounters: Record<string, CounterObject | CounterObject[]> = {
  미터: {
    counterKo: '미터',
    counterEn: 'meter',
    numberType: 'sino',
    desc: 'A counter for meters.',
    examples: [
      {
        createExampleKo: (counterKo, number, countableKo): string =>
          `그것은 길이가 ${number.hangul} ${counterKo}이다.`,
        createExampleEn: (counterEn, number, countableEn): string =>
          `It's ${number.formattedNumber} ${counterEn} long.`,
        range: [1, 2],
      },
    ],
  },
  킬로그램: {
    counterKo: '킬로그램',
    counterEn: 'kilogram',
    numberType: 'sino',
    desc: 'A counter for kilograms.',
    examples: [
      {
        createExampleKo: (counterKo, number, countableKo): string =>
          `무게는 ${number.hangul} ${counterKo}입니다.`,
        createExampleEn: (counterEn, number, countableEn): string =>
          `The weight is ${number.formattedNumber} ${counterEn}.`,
        range: [1, 3],
      },
    ],
  },
  살: {
    counterKo: '살',
    counterEn: 'year',
    numberType: 'native',
    desc: 'A counter used for age.',
    examples: [
      {
        createExampleKo: (counterKo, number): string => `저는 ${number.hangul} ${counterKo} 살이에요.`,
        createExampleEn: (counterEn, number): string => `I am ${number.formattedNumber} ${counterEn} old.`,
        range: [1, 60],
      },
    ],
  },
};

export const allCounters = {
  ...generalCounters,
  ...dateAndTimeCounters,
  ...measureWordIsAlwaysTheNounCounters,
};
