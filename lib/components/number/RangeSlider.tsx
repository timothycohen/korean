import { Slider } from '@mui/material';
import { HangulNumber, NativeNumber, SinoNumber } from 'lib/number';
import Typography from '@mui/material/Typography';

type RangeSliderProps = {
  goal: NativeNumber | SinoNumber;
  setGoal: React.Dispatch<React.SetStateAction<NativeNumber | SinoNumber>>;
};

export default function RangeSlider({ goal, setGoal }: RangeSliderProps) {
  let formattedRange = goal?.formattedRange ? goal.formattedRange : ['0', '0'];

  return (
    <>
      <Typography
        variant="h1"
        sx={{
          width: '100%',
          textAlign: 'center',
          fontSize: 'clamp(1.3rem, 8vw, 3.2rem)',
          color: 'primary.2',
        }}
      >{`${formattedRange[0]} - ${formattedRange[1]}`}</Typography>

      <Slider
        sx={{
          width: '90%',
          margin: 'auto',
        }}
        step={1}
        min={goal.absMin}
        max={goal.absMax}
        value={[goal.min, goal.max]}
        valueLabelDisplay="auto"
        onChange={(_event: Event, newValue: number | number[]): void => {
          if (typeof newValue === 'number') return;
          if (goal.range[0] !== newValue[0] || goal.range[1] !== newValue[1]) {
            setGoal(({ type, option }): NativeNumber | SinoNumber => {
              const newGoal = HangulNumber.create(type, option);
              newGoal.range = [newValue[0], newValue[1]];
              return newGoal;
            });
          }
        }}
      />
    </>
  );
}
