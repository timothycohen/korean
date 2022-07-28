import { SinoNumber, NativeNumber } from '$number/logic';
import { isHangul } from '$backend/utils';

// military time is used the same way it is in the States (train/bus schedules, etc.), but even when it is not used, it's usually spoken in 12 hour form.
// 오전 (ojeon)	AM
// 오후 (ohu)	PM

export default class HangulTime {
  hour: Hour;
  minute: Minute;
  hangul: string;
  HHMM: string;
  constructor({ hour, minute }: { hour?: Hour; minute?: Minute }) {
    this.hour = hour ?? ((Math.floor(Math.random() * 12) + 1) as Hour);
    this.minute = minute ?? (Math.floor(Math.random() * 60) as Minute);
    this.hangul = HangulTime.toHangul(this.hour, this.minute);
    this.HHMM = HangulTime.toHHMM(this.hour, this.minute);
  }

  static toHangul = (hour: Hour, minute: Minute): string => {
    const koreanHour = new NativeNumber('counter').fromNumber(hour);
    const koreanMinute = new SinoNumber('cardinal').fromNumber(minute);
    if (!minute) {
      return `${koreanHour.hangul}시`;
    } else {
      return `${koreanHour.hangul}시 ${minute === 30 ? '반' : `${koreanMinute.hangul}분`}`;
    }
  };

  static toHHMM = (hour: Hour, minute: Minute): string => {
    const formattedHour = hour < 10 ? `0${hour}` : hour;
    const formattedMinute = minute < 10 ? `0${minute}` : minute;
    return `${formattedHour}:${formattedMinute}`;
  };

  static isValidHangul = (str: string): boolean => isHangul(str);

  static isValidHHMM = (time: string, option: 'possible' | 'complete' = 'possible'): boolean => {
    let valid: RegExp[];
    if (option === 'possible') {
      valid = [
        // empty
        /^$/,

        // single leading digit
        /^[0-9]$/,
        /^[1-9]:$/,
        /^[1-9]:[0-5]$/,
        /^[1-9]:[0-5][0-9]$/,

        // leading 0
        /^0[1-9]$/,
        /^0[1-9]:$/,
        /^0[1-9]:[0-5]$/,
        /^0[1-9]:[0-5][0-9]$/,

        // >9
        /^1[0-2]$/,
        /^1[0-2]:$/,
        /^1[0-2]:[0-5]$/,
        /^1[0-2]:[0-5][0-9]$/,
      ];
    } else {
      valid = [/^[1-9]:[0-5][0-9]$/, /^0[1-9]:[0-5][0-9]$/, /^1[0-2]:[0-5][0-9]$/];
    }
    const answer = valid.reduce((acc, reg): boolean => reg.test(time) || acc, false);
    return answer;
  };

  isMatch = (userTime: string): boolean => {
    if (!HangulTime.isValidHHMM(userTime, 'complete')) return false;
    const userHr = Number(userTime.split(':')[0]) as Hour;
    const userMin = Number(userTime.split(':')[1]) as Minute;
    return HangulTime.toHHMM(userHr, userMin) === this.HHMM;
  };
}

// just console logged a for loop. clean this up upon proposals #43505 #15480

export type Hour = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type Minute =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48
  | 49
  | 50
  | 51
  | 52
  | 53
  | 54
  | 55
  | 56
  | 57
  | 58
  | 59;
