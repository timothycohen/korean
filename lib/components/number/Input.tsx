import { HangulNumber, SinoNumber, NativeNumber } from 'lib/number';
import { format, unFormat } from 'lib/number/utils';
import { Dispatch, SetStateAction, useEffect } from 'react';
import styled from '@mui/system/styled';
import VisibilityOff from '@mui/icons-material/VisibilityOffTwoTone';
import Visibility from '@mui/icons-material/VisibilityTwoTone';
import Box from '@mui/system/Box';

interface InputProps {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  direction: 'userNumGoalHan' | 'userHanGoalNum';
  goal: NativeNumber | SinoNumber;
  setGoal: React.Dispatch<React.SetStateAction<NativeNumber | SinoNumber>>;
  showParsedInput: boolean;
  setShowParsedInput: Dispatch<SetStateAction<boolean>>;
}

const InputStyled = styled('input')(({ theme }) => ({
  width: '100%',
  height: '3rem',
  fontSize: 'clamp(1rem, 5.25vw, 2.5rem)',
  padding: '0 1.25rem',
  textAlign: 'center',
  border: `2px solid ${theme.palette.primary['2']}`,
  '&:focus-visible': {
    border: '2px solid transparent',
    outline: `2px solid ${theme.palette.primary['4']}`,
  },
  borderRadius: '4px',
}));

const visibilityStyles = {
  position: 'relative',
  justifySelf: 'right',
  top: '-2.4rem',
  right: '.5rem',
  color: 'gray.4',
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  padding: '0',
  height: '2rem',
};

const visuallyHidden = {
  border: '0',
  clip: 'rect(0 0 0 0)',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  padding: '0',
  position: 'absolute',
  width: '1px',
};

export default function Input({
  input,
  setInput,
  direction,
  goal,
  setGoal,
  showParsedInput,
  setShowParsedInput,
}: InputProps): JSX.Element {
  useEffect((): void => {
    setInput('');
  }, [setInput, direction]);

  useEffect((): void => {
    const handleWin = () => {
      const newGoal = HangulNumber.create(goal.type, goal.option);
      newGoal.range = goal.range;
      setGoal(newGoal);
      setInput('');
    };

    if (
      (direction === 'userHanGoalNum' && input === goal.hangul) ||
      (direction === 'userNumGoalHan' && input !== '' && parseInt(unFormat(input)) === goal.number)
    ) {
      handleWin();
    }
  }, [direction, goal.hangul, goal.number, goal.option, goal.range, goal.type, input, setGoal, setInput]);

  // todo no back to back duplicates. handle 0
  // while (userInputNum === goal.number.toString()) {
  //   setGoal(goal.setRandom());
  // }

  const UserHanGoalNum = (
    <>
      <label htmlFor="userHanGoalNum" style={visuallyHidden}>
        Write in hangul: {goal.number}
      </label>
      <InputStyled
        id="userHanGoalNum"
        lang="ko"
        type="text"
        key={
          goal.number
        } /* this is necessary to prevent 한글 autocomplete carrying over from the last word */
        aria-label={`Enter hangul. Goal ${goal.number}`}
        autoFocus={true}
        value={input}
        sx={{ fontFamily: 'GowunDodum', marginBottom: '1.875rem' }}
        onChange={e => {
          setInput(e.currentTarget.value.replaceAll(/\d/g, '').replaceAll('.', '').replaceAll(',', ''));
        }}
      />
    </>
  );

  const UserNumGoalHan = (
    <Box sx={{ display: 'grid', width: '100%' }}>
      <label htmlFor="userNumGoalHan" style={visuallyHidden}>
        Write numbers: {goal.hangul}
      </label>
      <InputStyled
        lang="ko"
        id="userNumGoalHan"
        type="text"
        autoFocus={true}
        value={input === '' ? '' : format(parseInt(input))}
        sx={{ fontFamily: 'BioRhyme' }}
        onChange={e => {
          let userInputNum = unFormat(e.currentTarget.value);
          if (userInputNum === '') setInput('');
          else if (/^0.$/.test(userInputNum)) setInput(userInputNum[1]);
          else if (goal.isValid(userInputNum)) setInput(userInputNum);
        }}
      />
      {showParsedInput ? (
        <button
          type="button"
          style={visibilityStyles}
          onClick={() => setShowParsedInput(false)}
          title="hide hangul input"
        >
          <Visibility sx={{ fontSize: '2rem' }} />
        </button>
      ) : (
        <button
          type="button"
          style={visibilityStyles}
          onClick={() => setShowParsedInput(true)}
          title="show hangul input"
        >
          <VisibilityOff sx={{ fontSize: '2rem' }} />
        </button>
      )}
    </Box>
  );

  return direction === 'userHanGoalNum' ? UserHanGoalNum : UserNumGoalHan;
}
