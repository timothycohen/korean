export interface ColorMap {
  hex: string;
  Korean: string;
  English: string;
}

// prettier-ignore
const colorsArray: ColorMap[] = [
  {hex: '#000000', Korean: '까만색',			English: 'black'},
  {hex: '#F30502', Korean: '빨간색',			English: 'red'},
  {hex: '#F0742A', Korean: '주황색',			English: 'orange'},
  {hex: '#FFFF00', Korean: '노란색',			English: 'yellow'},
  {hex: '#068542', Korean: '녹색',				English: 'deep green'},
  {hex: '#0B8B74', Korean: '초록색',			English: 'green blue'},
  {hex: '#92D14F', Korean: '연두색',			English: 'light green'},
  {hex: '#3977DA', Korean: '파란색',			English: 'blue'},
  {hex: '#93CCDD', Korean: '하늘색',			English: 'light blue'},
  {hex: '#012060', Korean: '남색',				English: 'dark blue'},
  {hex: '#7030A0', Korean: '보라색',			English: 'purple'},
  {hex: '#ED28C0', Korean: '분홍색',			English: 'pink'},
  {hex: '#984907', Korean: '갈색',				English: 'brown'},
  {hex: '#FDEADB', Korean: '베이지색',		English: 'beige'},
  {hex: '#A6A6A6', Korean: '회색',				English: 'gray'},
  {hex: '#FFFFFF', Korean: '하얀색',			English: 'white'}
]

export default class Colors {
  private color: ColorMap;

  constructor() {
    this.color = this.random;
  }

  get random(): ColorMap {
    return colorsArray[Math.floor(Math.random() * colorsArray.length)];
  }

  get all(): ColorMap[] {
    return colorsArray;
  }

  get English(): ColorMap['English'] {
    return this.color.English;
  }
  get Korean(): ColorMap['Korean'] {
    return this.color.Korean;
  }
  get hex(): ColorMap['hex'] {
    return this.color.hex;
  }
}
