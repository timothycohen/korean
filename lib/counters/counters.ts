import { NativeNumber } from '../number/NativeNumber';
import { SinoNumber } from '../number/SinoNumber';

export interface CounterObject {
  counterKo: string;
  counterEn: string;
  numberType: 'native' | 'sino';
  desc: string;
  examples: Countable[];
}

const fruits = [
  { Ko: '바나나', En: 'banana' },
  { Ko: '사과', En: 'apple' },
  { Ko: '배', En: 'pear' },
  { Ko: '복숭아', En: 'peach' },
  { Ko: '망고', En: 'mango' },
];

const animals = [
  { Ko: '고양이', En: 'cat' },
  { Ko: '개', En: 'dog' },
];

const drinks = {
  coffee: [
    { Ko: '커피', En: 'coffee' },
    { Ko: '아메리카노', En: 'americano' },
    { Ko: '카페라떼', En: 'cafe latte' },
    { Ko: '카푸치노', En: 'cappuccino' },
    { Ko: '카페모카', En: 'cafe mocha' },
  ],
  other: [
    { Ko: '콜라', En: 'cola' },
    { Ko: '사이다', En: 'sprite' },
    { Ko: '오렌지주스', En: 'orange juice' },
    { Ko: '물', En: 'water' },
  ],
};

export interface Countable {
  countable?: { Ko?: string; En?: string }[];
  createExampleKo: (counterKo: string, number: NativeNumber | SinoNumber, countableKo?: string) => string;
  createExampleEn: (counterEn: string, number: NativeNumber | SinoNumber, countableEn?: string) => string;
  range?: [number, number];
}

export const counters: Record<string, CounterObject | CounterObject[]> = {
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
    numberType: 'native',
    counterEn: 'animal',
    desc: 'A counter used for animals.',
    examples: [
      {
        countable: animals,
        createExampleKo: (counterKo, number, countableKo): string =>
          `우리 가족은 ${countableKo}를 ${number.hangul} ${counterKo} 키우고 있어요.`,
        createExampleEn: (counterEn, number, countableEn): string =>
          `My family has ${number.formattedNumber} ${countableEn}.`,
        range: [1, 5],
      },
    ],
  },
  권: {
    counterKo: '권',
    numberType: 'native',
    counterEn: 'book / notebook',
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
  살: {
    counterKo: '살',
    numberType: 'native',
    counterEn: 'year',
    desc: 'A counter used for age.',
    examples: [
      {
        createExampleKo: (counterKo, number): string => `저는 ${number.hangul} ${counterKo} 살이에요.`,
        createExampleEn: (counterEn, number): string => `I am ${number.formattedNumber} ${counterEn} old.`,
        range: [1, 60],
      },
    ],
  },
  명: {
    counterKo: '명',
    numberType: 'native',
    counterEn: 'person',
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
    numberType: 'native',
    counterEn: 'person',
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
  분: [
    {
      counterKo: '분',
      numberType: 'native',
      counterEn: 'person',
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
      numberType: 'sino',
      counterEn: 'minute',
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
  조각: {
    counterKo: '조각',
    numberType: 'native',
    counterEn: 'slice',
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
    numberType: 'native',
    counterEn: 'sheet',
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
    numberType: 'native',
    counterEn: 'cup',
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
    numberType: 'native',
    counterEn: 'bottle',
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
    numberType: 'native',
    counterEn: 'car / machine',
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
    numberType: 'native',
    counterEn: 'bowl',
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
    numberType: 'native',
    counterEn: 'building',
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
    numberType: 'native',
    counterEn: 'tree',
    desc: 'A counter for trees.',
    examples: [
      {
        countable: [{ Ko: '나무', En: 'tree' }],
        createExampleKo: (counterKo, number, countableKo): string =>
          `식목일에 ${countableKo} ${number.hangul} ${counterKo}를 심는 게 목표예요.`,
        createExampleEn: (counterEn, number, countableEn): string =>
          `My goal is to plant ${number.number} ${counterEn} on Arbor Day.`,
      },
    ],
  },
  // 벌: {
  //   counterKo: '벌',
  //   numberType: 'native',
  //   counterEn: 'clothes',
  //   desc: 'A counter for clothes.',
  //   examples: [
  //     {
  //       // countable: [{ Ko: '', En: '' }],
  //       // createExampleKo: (counterKo, number, countableKo): string =>
  //       // `회사를 다니기 위해서 새 옷을 두 벌 샀어요.`,
  //       // createExampleEn: (counterEn, number, countableEn): string =>
  //       // ``
  //     },
  //   ],
  // },
  // 켤레: {
  //   counterKo: '켤레',
  //   numberType: 'native',
  //   counterEn: 'pair of shoes',
  //   desc: 'A counter for pairs of shoes.',
  //   examples: [
  //     {
  //       // countable: [{ Ko: '', En: '' }],
  //       // createExampleKo: (counterKo, number, countableKo): string =>
  //       // `결혼식을 위해 구두 두 켤레를 샀어요.`,
  //       // createExampleEn: (counterEn, number, countableEn): string =>
  //       // ``
  //     },
  //   ],
  // },
  // 가지: {
  //   counterKo: '가지',
  //   numberType: 'native',
  //   counterEn: 'kind',
  //   desc: 'A counter for kinds, varieties, sorts.',
  //   examples: [
  //     {
  //       // countable: [{ Ko: '', En: '' }],
  //       // createExampleKo: (counterKo, number, countableKo): string =>
  //       // `사람은 다섯 가지감각이 있습니다.`,
  //       // createExampleEn: (counterEn, number, countableEn): string =>
  //       // ``
  //     },
  //   ],
  // },
  // 군데: {
  //   counterKo: '군데',
  //   numberType: 'native',
  //   counterEn: 'place',
  //   desc: 'A counter for places.',
  //   examples: [
  //     {
  //       // countable: [{ Ko: '', En: '' }],
  //       // createExampleKo: (counterKo, number, countableKo): string =>
  //       // `국내 여행을 세 군데 생각해 봤어.`,
  //       // createExampleEn: (counterEn, number, countableEn): string =>
  //       // ``
  //     },
  //   ],
  // },
  // 번: {
  //   counterKo: '번',
  //   numberType: 'native',
  //   counterEn: 'time (number of)',
  //   desc: 'A counter for number of times.',
  //   examples: [
  //     {
  //       // countable: [{ Ko: '', En: '' }],
  //       // createExampleKo: (counterKo, number, countableKo): string =>
  //       // `벌써 세 번 연락해봤어.`,
  //       // createExampleEn: (counterEn, number, countableEn): string =>
  //       // ``
  //     },
  //   ],
  // },
  // 시: {
  //   counterKo: '시',
  //   numberType: 'native',
  //   counterEn: 'hour (time)',
  //   desc: 'A counter for hours (time).',
  //   examples: [
  //     {
  //       // countable: [{ Ko: '', En: '' }],
  //       // createExampleKo: (counterKo, number, countableKo): string =>
  //       // `지금 오후 한 시예요?`,
  //       // createExampleEn: (counterEn, number, countableEn): string =>
  //       // ``
  //     },
  //   ],
  // },
  // 달: {
  //   counterKo: '달',
  //   numberType: 'native',
  //   counterEn: 'month',
  //   desc: 'A counter for months.',
  //   examples: [
  //     {
  //       // countable: [{ Ko: '', En: '' }],
  //       // createExampleKo: (counterKo, number, countableKo): string =>
  //       // `다섯 달 전에 한국에 왔어요.`,
  //       // createExampleEn: (counterEn, number, countableEn): string =>
  //       // ``
  //     },
  //   ],
  // },
  // 해: {
  //   counterKo: '해',
  //   numberType: 'native',
  //   counterEn: 'year',
  //   desc: 'A counter for years.',
  //   examples: [
  //     {
  //       // countable: [{ Ko: '', En: '' }],
  //       // createExampleKo: (counterKo, number, countableKo): string =>
  //       // `여기서 일 한지 벌써 여섯 해야.`,
  //       // createExampleEn: (counterEn, number, countableEn): string =>
  //       // ``
  //     },
  //   ],
  // },
  // 시간: {
  //   counterKo: '시간',
  //   numberType: 'native',
  //   counterEn: 'hour (duration)',
  //   desc: 'A counter for duration in hours.',
  //   examples: [
  //     {
  //       // countable: [{ Ko: '', En: '' }],
  //       // createExampleKo: (counterKo, number, countableKo): string =>
  //       // `이 시험은 네 시간 걸릴 거예요.`,
  //       // createExampleEn: (counterEn, number, countableEn): string =>
  //       // ``
  //     },
  //   ],
  // },
  // 일: {
  //   counterKo: '일',
  //   numberType: 'sino',
  //   counterEn: 'day',
  //   desc: 'A counter for days.',
  //   examples: [
  //     {
  //       // countable: [{ Ko: '', En: '' }],
  //       // createExampleKo: (counterKo, number, countableKo): string =>
  //       // `삼 일 뒤에 다시 갈 거야.`,
  //       // createExampleEn: (counterEn, number, countableEn): string =>
  //       // ``
  //     },
  //   ],
  // },
  // 주일: {
  //   counterKo: '주일',
  //   numberType: 'sino',
  //   counterEn: 'week',
  //   desc: 'A counter for weeks.',
  //   examples: [
  //     {
  //       // countable: [{ Ko: '', En: '' }],
  //       // createExampleKo: (counterKo, number, countableKo): string =>
  //       // `개학하고 나서 삼 주일이나 학교에 못 갔어.`,
  //       // createExampleEn: (counterEn, number, countableEn): string =>
  //       // ``
  //     },
  //   ],
  // },
  // 월: {
  //   counterKo: '월',
  //   numberType: 'sino',
  //   counterEn: 'month',
  //   desc: 'A counter for months.',
  //   examples: [
  //     {
  //       // countable: [{ Ko: '', En: '' }],
  //       // createExampleKo: (counterKo, number, countableKo): string =>
  //       // `오늘은 오 월 십이 일입니다.`,
  //       // createExampleEn: (counterEn, number, countableEn): string =>
  //       // ``
  //     },
  //   ],
  // },
  // 개월: {
  //   counterKo: '개월',
  //   numberType: 'sino',
  //   counterEn: 'month (duration)',
  //   desc: 'A counter for duration of months.',
  //   examples: [
  //     {
  //       // countable: [{ Ko: '', En: '' }],
  //       // createExampleKo: (counterKo, number, countableKo): string =>
  //       // `지금까지 남자친구랑 칠 개월 동안 만나고 있어요.`,
  //       // createExampleEn: (counterEn, number, countableEn): string =>
  //       // ``
  //     },
  //   ],
  // },
  // 년: {
  //   counterKo: '년',
  //   numberType: 'sino',
  //   counterEn: 'year',
  //   desc: 'A counter for years.',
  //   examples: [
  //     {
  //       // countable: [{ Ko: '', En: '' }],
  //       // createExampleKo: (counterKo, number, countableKo): string =>
  //       // `일 년 뒤에 승진할 수 있어!`,
  //       // createExampleEn: (counterEn, number, countableEn): string =>
  //       // ``
  //     },
  //   ],
  // },
  // 초: {
  //   counterKo: '초',
  //   numberType: 'sino',
  //   counterEn: 'second',
  //   desc: 'A counter for seconds.',
  //   examples: [
  //     {
  //       // countable: [{ Ko: '', En: '' }],
  //       // createExampleKo: (counterKo, number, countableKo): string =>
  //       // `나는 34분 20초에 5킬러미터를 달릴 수 있어요.`,
  //       // createExampleEn: (counterEn, number, countableEn): string =>
  //       // ``
  //     },
  //   ],
  // },
  // 층: {
  //   counterKo: '층',
  //   numberType: 'sino',
  //   counterEn: 'floor',
  //   desc: 'A counter for floors in a building.',
  //   examples: [
  //     {
  //       // countable: [{ Ko: '', En: '' }],
  //       // createExampleKo: (counterKo, number, countableKo): string =>
  //       // `우리 건물은 6층이 있어요.`,
  //       // createExampleEn: (counterEn, number, countableEn): string =>
  //       // ``
  //     },
  //   ],
  // },
  // 킬로그램: {
  //   counterKo: '킬로그램',
  //   numberType: 'sino',
  //   counterEn: 'kilogram',
  //   desc: 'A counter for kilograms.',
  //   examples: [
  //     {
  //       // countable: [{ Ko: '', En: '' }],
  //       // createExampleKo: (counterKo, number, countableKo): string =>
  //       // `기내 수화물은 15킬로그램까지 가능합니다.`,
  //       // createExampleEn: (counterEn, number, countableEn): string =>
  //       // ``
  //     },
  //   ],
  // },
  // 미터: {
  //   counterKo: '미터',
  //   numberType: 'sino',
  //   counterEn: 'meter',
  //   desc: 'A counter for meters.',
  //   examples: [
  //     {
  //       // countable: [{ Ko: '', En: '' }],
  //       // createExampleKo: (counterKo, number, countableKo): string =>
  //       // `가로 길이는 삼 미터이고, 세로 길이는 일 미터인 테이블이 좋겠어!`,
  //       // createExampleEn: (counterEn, number, countableEn): string =>
  //       // ``
  //     },
  //   ],
  // },
};
