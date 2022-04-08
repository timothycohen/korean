import styled from '@mui/system/styled';
import { HangulNumber } from 'lib/number';
import { Goal, GoalAnswer, ParsedUserInput } from 'lib/components/styled';

interface DisplayProps {
  direction: 'userNumGoalHan' | 'userHanGoalNum';
  goal: HangulNumber;
  parsedInput: string;
  showGoalAnswer: boolean;
  showParsedInput: boolean;
}

const Container = styled('div')({
  width: '100%',
});

export default function Display({
  direction,
  goal,
  parsedInput,
  showGoalAnswer,
  showParsedInput,
}: DisplayProps) {
  return (
    <Container>
      <Goal
        numOrHan={direction === 'userNumGoalHan' ? 'han' : 'num'}
        koreanAriaLabel={`Goal ${goal.hangul}`}
        englishAriaLabel={`Goal ${goal.number}`}
      >
        {direction === 'userNumGoalHan' ? goal.hangul : goal.formattedNumber}
      </Goal>
      <GoalAnswer
        numOrHan={direction === 'userNumGoalHan' ? 'num' : 'han'}
        koreanAriaLabel={`Answer ${goal.hangul}`}
        englishAriaLabel={`Answer ${goal.number}`}
        tabIndex={showGoalAnswer ? 0 : -1}
      >
        {showGoalAnswer ? (direction === 'userNumGoalHan' ? goal.formattedNumber : goal.hangul) : ' '}
      </GoalAnswer>
      <ParsedUserInput
        tabIndex={showParsedInput && direction === 'userNumGoalHan' ? 0 : -1}
        aria-label={`Your input ${parsedInput}`}
        lang="ko"
      >
        {showParsedInput && parsedInput}
      </ParsedUserInput>
    </Container>
  );
}
