import { useEffect } from 'react';
import VisibilityOff from '@mui/icons-material/VisibilityOffTwoTone';
import Visibility from '@mui/icons-material/VisibilityTwoTone';
import { HangulTime } from 'lib/time';
import { Input as InputStyled, InputVisibilityBtn } from 'lib/components/styled';

interface InputProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  direction: 'userTimeGoalHan' | 'userHanGoalTime';
  goal: HangulTime;
  showParsedInput: boolean;
  setShowParsedInput: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Input({
  input,
  setInput,
  direction,
  goal,
  showParsedInput,
  setShowParsedInput,
}: InputProps): JSX.Element {
  useEffect((): void => {
    setInput('');
  }, [setInput, direction]);

  const UserHanGoalNum = (
    <InputStyled
      lang="en"
      type="text"
      autoFocus={true}
      /* rerender the input to prevent 한글 autocomplete carrying over from the last word */
      /* this also presents the aria information again to screen readers */
      /* additionally prevents invalid input from the previous direction's input */
      key={goal.HHMM}
      aria-label={`Enter hangul. Goal ${goal.HHMM}`}
      value={input}
      autoComplete="off"
      sx={{ fontFamily: 'GowunDodum', marginBottom: '1.875rem' }}
      onChange={e => {
        if (HangulTime.isValidHangul(e.currentTarget.value)) {
          console.log('setting input as ' + e.currentTarget.value);
          setInput(e.currentTarget.value);
        } else {
          // todo show error message on page
          console.log('write in hangul');
        }
      }}
    />
  );

  const VisibilityButton = (
    <InputVisibilityBtn
      type="button"
      onClick={(): void => (showParsedInput ? setShowParsedInput(false) : setShowParsedInput(true))}
      title={showParsedInput ? 'hide hangul input' : 'show hangul input'}
    >
      {showParsedInput ? (
        <Visibility sx={{ fontSize: '2rem' }} />
      ) : (
        <VisibilityOff sx={{ fontSize: '2rem' }} />
      )}
    </InputVisibilityBtn>
  );

  const UserNumGoalHan = (
    <div style={{ display: 'grid', width: '100%' }}>
      <InputStyled
        lang="ko"
        // todo the mobile keyboard should show as number + :
        // unfortunately number doesn't show : and with text the user has to manually reset to numbers every time
        // I could also do type="time" and have the clock popup... but it's a modal and covers the goal
        // best solution is to just do numbers and automatically insert the :
        type="text"
        autoFocus={true}
        key={goal.hangul}
        aria-label={`Enter number. Goal ${goal.hangul}`}
        value={input}
        autoComplete="off"
        sx={{ fontFamily: 'BioRhyme' }}
        onChange={e => {
          const userTime = e.currentTarget.value;
          if (HangulTime.isValidHHMM(userTime)) {
            setInput(userTime);
          }
          // todo show error message on page
          console.log('input a valid time');
        }}
      />
      {VisibilityButton}
    </div>
  );

  return direction === 'userHanGoalTime' ? UserHanGoalNum : UserNumGoalHan;
}
