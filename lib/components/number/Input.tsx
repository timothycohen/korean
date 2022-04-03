import { useEffect } from 'react';
import styled from '@mui/system/styled';
import VisibilityOff from '@mui/icons-material/VisibilityOffTwoTone';
import Visibility from '@mui/icons-material/VisibilityTwoTone';
import Box from '@mui/system/Box';
import { HangulNumber, SinoNumber, NativeNumber, format, unFormat } from 'lib/number';
import { Input as InputStyled } from 'lib/components/styled';

// todo no back to back duplicates. handle 0
// while (userInputNum === goal.number.toString()) {
//   setGoal(goal.setRandom());
// }

// todo range slider keyboard usage is broken because of input autofocus.
// on success: 1) clear input 2) clear language composition 3) keep focus 4) present new goal to screen readers 5) don't pull focus from other components
// can't remove key (which rerenders input) because that's how the hangul input composition is reset. simply setting input to '' will not work
// can't add autofocus to the input because it pulls focus when updating other components that cause it to rerender
// can't do a simple focus after the onchange because the input hasn't rerendered yet (even when wrapped in a timeout to delay on the event loop)
// can't remove and readd on the range slider update because then focus wouldn't be on when input is rerendered after sucessful input

interface InputProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  direction: 'userNumGoalHan' | 'userHanGoalNum';
  goal: NativeNumber | SinoNumber;
  setGoal: React.Dispatch<React.SetStateAction<NativeNumber | SinoNumber>>;
  showParsedInput: boolean;
  setShowParsedInput: React.Dispatch<React.SetStateAction<boolean>>;
}

const StyledVisibilityButton = styled('button')({
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
});

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

  const UserHanGoalNum = (
    <InputStyled
      id="userHanGoalNum"
      lang="en"
      type="text"
      autoFocus={true}
      /* rerender the input to prevent 한글 autocomplete carrying over from the last word */
      /* this also presents the aria information again to screen readers */
      key={goal.number}
      aria-label={`Enter hangul. Goal ${goal.number}`}
      value={input}
      autoComplete="off"
      sx={{ fontFamily: 'GowunDodum', marginBottom: '1.875rem' }}
      onChange={e => {
        setInput(e.currentTarget.value.replaceAll(/\d/g, '').replaceAll('.', '').replaceAll(',', ''));
      }}
    />
  );

  const VisibilityButton = (
    <StyledVisibilityButton
      type="button"
      onClick={(): void => (showParsedInput ? setShowParsedInput(false) : setShowParsedInput(true))}
      title={showParsedInput ? 'hide hangul input' : 'show hangul input'}
    >
      {showParsedInput ? (
        <Visibility sx={{ fontSize: '2rem' }} />
      ) : (
        <VisibilityOff sx={{ fontSize: '2rem' }} />
      )}
    </StyledVisibilityButton>
  );

  const UserNumGoalHan = (
    <Box sx={{ display: 'grid', width: '100%' }}>
      <InputStyled
        lang="ko"
        id="userNumGoalHan"
        type="text"
        autoFocus={true}
        key={goal.number}
        aria-label={`Enter number. Goal ${goal.hangul}`}
        value={input === '' ? '' : format(parseInt(input))}
        autoComplete="off"
        sx={{ fontFamily: 'BioRhyme' }}
        onChange={e => {
          let userInputNum = unFormat(e.currentTarget.value);
          if (userInputNum === '') setInput('');
          else if (/^0.$/.test(userInputNum)) setInput(userInputNum[1]);
          else if (goal.isValid(userInputNum)) setInput(userInputNum);
        }}
      />
      {VisibilityButton}
    </Box>
  );

  return direction === 'userHanGoalNum' ? UserHanGoalNum : UserNumGoalHan;
}
