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
  id: string;
  counterKo: string;
  counterEn: string;
  numberType: 'native' | 'sino';
  desc: string;
  examples: CounterExample[];
}

const generalCounters: CounterObject[] = [
  {
    id: 'e05284db-3b61-47db-a6bc-32862a3a440f',
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
  {
    id: 'fbbd28f6-54a3-4eb1-81e7-a22ccd54d7ca',
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
  {
    id: '8c2589da-c6f8-4b3f-8721-d74a6907b0fb',
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
  {
    id: '887010d3-5e10-4711-9454-69c3042197e0',
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
  {
    id: 'b02316cc-d36d-4818-80ae-e66136b39824',
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
  {
    id: 'cc464015-bb5e-43a1-bbdd-c890dfad56b5',
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
  {
    id: 'd6b43697-56d9-48bc-93f8-4bb4b8746fb0',
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
  {
    id: '62469abb-cb40-42f1-a2f3-6454e7cae217',
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
  {
    id: '890553fa-4a18-421e-b51a-d32180978d8b',
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
  {
    id: '2dd05c32-d13d-4b2f-9b92-e6b9c9494443',
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
  {
    id: '03b01f58-080b-4d02-8a07-b98fa8483ab3',
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
  {
    id: 'e19dffd7-1839-4990-8d57-ff3dfb98b3ef',
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
  {
    id: 'f9fa52f6-7b64-4ada-a86b-50b95c920c96',
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
  {
    id: 'bb6f9262-41ff-45cd-bac8-1232f060199f',
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
  {
    id: 'b629b42d-92aa-4294-bf60-1041029051e5',
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

  {
    id: 'ba736acd-19c4-480e-b405-3432708a059c',
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
  {
    id: 'e05fa6fd-626f-4138-bf9d-0897905c56f8',
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
  {
    id: 'ceb01d18-5299-476b-8dd2-d0bfc3cdf2f7',
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
  {
    id: 'bdba91ce-39d4-4545-b082-06e6ed68cc3c',
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
];

const dateAndTimeCounters: CounterObject[] = [
  {
    id: 'be28314c-48f2-4df3-9078-bc402bf5b80a',
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
    id: 'e256409a-5fa4-4d26-8aac-57d106bb04a0',
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
  {
    id: 'f802fcd8-5991-46cd-b213-e392bff4d0cf',
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
  {
    id: 'be42c508-a454-4c15-9ebf-76730c6300ba',
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
  {
    id: 'e3c8bc41-2af2-482d-9d94-35f8bd624de4',
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
  {
    id: '70603e9c-1db6-4914-9067-2bff6e096cfe',
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
  {
    id: '27dcc74c-2379-4e7f-b353-fbc85b7d9ea8',
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
  {
    id: 'e9b49b64-ee3f-467e-ac42-99dacebaf735',
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
  {
    id: 'b0c31f70-cd40-4375-85ec-58539bceb688',
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
  {
    id: '3afe20e1-f75b-4255-ac63-7df0b2c63ca3',
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
  {
    id: 'f12a593e-a4aa-4e18-90d2-a3dc1940ef9c',
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
  // {
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
];

const measureWordIsAlwaysTheNounCounters: CounterObject[] = [
  {
    id: '1c5e817a-f0ec-405f-a65e-fc1c54cf8417',
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
  {
    id: '6f099443-31d1-4a27-ba2e-9ccdde9b3f6c',
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
  {
    id: '54176afc-5728-4aa9-8706-2b9f36ff29cf',
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
];

export const allCounters = [
  ...generalCounters,
  ...dateAndTimeCounters,
  ...measureWordIsAlwaysTheNounCounters,
];
