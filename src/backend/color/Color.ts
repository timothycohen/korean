export interface ColorMap {
  hex: string;
  korean: string;
  english: string;
}

// prettier-ignore
export const colorsArray: ColorMap[] = [
  {hex: '#000000', korean: '까만색',			english: 'black'},
  {hex: '#F30502', korean: '빨간색',			english: 'red'},
  {hex: '#F0742A', korean: '주황색',			english: 'orange'},
  {hex: '#FFFF00', korean: '노란색',			english: 'yellow'},
  {hex: '#068542', korean: '녹색',				english: 'deep green'},
  {hex: '#0B8B74', korean: '초록색',			english: 'green blue'},
  {hex: '#92D14F', korean: '연두색',			english: 'light green'},
  {hex: '#3977DA', korean: '파란색',			english: 'blue'},
  {hex: '#93CCDD', korean: '하늘색',			english: 'light blue'},
  {hex: '#012060', korean: '남색',				english: 'dark blue'},
  {hex: '#7030A0', korean: '보라색',			english: 'purple'},
  {hex: '#ED28C0', korean: '분홍색',			english: 'pink'},
  {hex: '#984907', korean: '갈색',				english: 'brown'},
  {hex: '#FDEADB', korean: '베이지색',		english: 'beige'},
  {hex: '#A6A6A6', korean: '회색',				english: 'gray'},
  {hex: '#FFFFFF', korean: '하얀색',			english: 'white'},
]

export default class Color {
  color: ColorMap;

  // accept 0-1 arguments
  constructor();
  constructor({ hex }: { hex: string });
  constructor({ english }: { english: string });
  constructor({ korean }: { korean: string });
  constructor({ hex, korean, english }: Partial<ColorMap> = {}) {
    // if no arguments, set to random color
    if (!hex && !korean && !english) {
      this.color = colorsArray[Math.floor(Math.random() * colorsArray.length)];
      return;
    }

    if (hex) {
      const color = Color.find({ hex });
      if (!color) throw new Error(`Unsupported hex color "${hex}"`);
      this.color = color;
    } else if (korean) {
      const color = Color.find({ korean });
      if (!color) throw new Error(`Unsupported korean color "${korean}"`);
      this.color = color;
    } else {
      const color = Color.find({ english });
      if (!color) throw new Error(`Unsupported english color "${english}"`);
      this.color = color;
    }
  }

  get hex(): ColorMap['hex'] {
    return this.color.hex;
  }

  get korean(): ColorMap['korean'] {
    return this.color.korean;
  }

  get english(): ColorMap['english'] {
    return this.color.english;
  }

  static get all(): ColorMap[] {
    return [...colorsArray];
  }

  static find({ hex, korean, english }: Partial<ColorMap>): ColorMap | undefined {
    if (hex) return this.all.find(c => c.hex === hex);
    if (korean) return this.all.find(c => c.korean === korean);
    if (english) return this.all.find(c => c.english === english);
  }
}
