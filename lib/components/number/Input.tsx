import { HangulNumber, SinoNumber, NativeNumber } from 'lib/number';
import { format, unFormat } from 'lib/number/utils';
import { Dispatch, SetStateAction, useEffect } from 'react';
import styled from '@mui/system/styled';
import VisibilityOff from '@mui/icons-material/VisibilityOffTwoTone';
import Visibility from '@mui/icons-material/VisibilityTwoTone';
import { Box } from '@mui/system';

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
  fontSize: 'xx-large',
  padding: '0.2rem',
  textAlign: 'center',
  border: `2px solid ${theme.palette.primary['2']}`,
  '&:focus-visible': {
    border: '2px solid transparent',
    outline: `2px solid ${theme.palette.primary['4']}`,
  },
  borderRadius: '4px',
  margin: '0 0 1rem 0',
}));

const visibilityStyles = {
  position: 'relative',
  justifySelf: 'right',
  marginRight: '.5rem',
  fontSize: '30px',
  marginTop: '-3px',
  top: '-50px',
  color: 'gray.4',
  cursor: 'pointer',
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
    <InputStyled
      lang="ko"
      type="text"
      key={goal.number} /* this is necessary to prevent 한글 autocomplete carrying over from the last word */
      autoFocus={true}
      value={input}
      sx={{ fontFamily: 'GowunDodum' }}
      onChange={e => {
        setInput(e.currentTarget.value.replaceAll(/\d/g, '').replaceAll('.', '').replaceAll(',', ''));
      }}
    />
  );

  const UserNumGoalHan = (
    <Box sx={{ display: 'grid', width: '100%' }}>
      <InputStyled
        lang="ko"
        type="text"
        autoFocus={true}
        value={input === '' ? '' : format(parseInt(input))}
        sx={{ fontFamily: 'BioRhyme', padding: '0 .75rem' }}
        onChange={e => {
          let userInputNum = unFormat(e.currentTarget.value);
          if (userInputNum === '') setInput('');
          else if (/^0.$/.test(userInputNum)) setInput(userInputNum[1]);
          else if (goal.isValid(userInputNum)) setInput(userInputNum);
        }}
      />
      {showParsedInput ? (
        <Visibility sx={visibilityStyles} onClick={() => setShowParsedInput(false)} />
      ) : (
        <VisibilityOff sx={visibilityStyles} onClick={() => setShowParsedInput(true)} />
      )}
    </Box>
  );

  return direction === 'userHanGoalNum' ? UserHanGoalNum : UserNumGoalHan;
}
