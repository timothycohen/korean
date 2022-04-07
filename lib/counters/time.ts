import { SinoNumber, NativeNumber } from 'lib/number';

// military time is used the same way it is in the States (train/bus schedules, etc.), but even when it is not used, it's usually spoken in 12 hour form.
// 오전 (ojeon)	AM
// 오후 (ohu)	PM

export const createHangulTime = (time?: Time): HangulTime => {
  let hour: Hour;
  let minute: Minute;

  hour = time?.hour ?? ((Math.floor(Math.random() * 12) + 1) as Hour);
  minute = time?.minute ?? (Math.floor(Math.random() * 60) as Minute);

  const koreanHour = new NativeNumber('counter').fromNumber(hour);
  const koreanMinute = new SinoNumber('cardinal').fromNumber(minute);

  let koreanTime;
  if (minute === 0) {
    koreanTime = `${koreanHour.hangul}시예요`;
  } else {
    koreanTime = `${koreanHour.hangul}시 ${minute === 30 ? '반' : `${koreanMinute.hangul}분`}이에요.`;
  }

  let formattedHour = hour < 10 ? `0${hour}` : hour;
  let formattedMinute = minute < 10 ? `0${minute}` : minute;
  let formattedTime = `${formattedHour}:${formattedMinute}`;

  return {
    hour: hour,
    minute: minute,
    koreanTime,
    formattedTime,
  };
};

// just console logged a for loop. clean this up upon proposals #43505 #15480

interface Time {
  hour: Hour;
  minute: Minute;
}

export type HangulTime = {
  koreanTime: string;
  formattedTime: string;
} & Time;

type Hour = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type Minute =
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
