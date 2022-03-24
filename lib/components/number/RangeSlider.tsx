import { useState } from 'react';
import styles from './RangeSlider.module.css';
import { Slider } from '@mui/material';
import { HangulNumber } from 'lib/number';

type RangeSliderProps = {
  goal: HangulNumber;
};

export default function RangeSlider({ goal }: RangeSliderProps) {
  const [emit, setEmit] = useState(true);

  const handleChange = (_e: Event, newValue: [number, number]) => {
    goal.range = newValue;
    setEmit(!emit);
  };

  let formattedRange = goal?.formattedRange ? goal.formattedRange : [0, 0];

  return (
    <>
      <h1>{`${formattedRange[0]} - ${formattedRange[1]}`}</h1>

      <Slider
        className={styles.slider}
        step={1}
        min={goal.absMin}
        max={goal.absMax}
        value={[goal.min, goal.max]}
        onChange={handleChange}
        valueLabelDisplay="auto"
      />
    </>
  );
}
