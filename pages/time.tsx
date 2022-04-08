import { useState, useEffect } from 'react';
import { createHangulTime, type HangulTime } from 'lib/time';
import { Clock } from 'lib/components/time';

export default function TimePage(): JSX.Element {
  const [time, setTime] = useState<HangulTime>(createHangulTime());
  const [hr, setHr] = useState('10');
  const [min, setMin] = useState('25');

  useEffect((): void => {
    const hour = parseInt(hr, 10);
    const minute = parseInt(min, 10);
    if (hour >= 1 && hour <= 12 && minute >= 0 && minute <= 59) {
      setTime(
        (): HangulTime =>
          createHangulTime({
            hour: hour as HangulTime['hour'],
            minute: minute as HangulTime['minute'],
          })
      );
    }
  }, [hr, min]);

  return (
    <>
      <Clock hour={parseInt(hr)} minute={parseInt(min)} />
      <h1>{time.koreanTime}</h1>
      <input
        type="text"
        value={hr}
        onChange={e => {
          let pot = e.currentTarget.value;
          if (pot.length > 2) pot = `${pot.slice(0, 1)}${pot['2']}`;
          if (pot === '' || pot === '0' || (parseInt(pot) >= 1 && parseInt(pot) <= 12)) setHr(pot);
        }}
      />
      <input
        value={min}
        type="text"
        onChange={e => {
          let pot = e.currentTarget.value;
          if (pot.length > 2) pot = `${pot.slice(0, 1)}${pot['2']}`;
          if (pot === '' || (parseInt(pot) >= 0 && parseInt(pot) <= 59)) setMin(pot);
        }}
      />
    </>
  );
}
