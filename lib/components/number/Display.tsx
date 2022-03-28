import { HangulNumber } from 'lib/number';
import styled from '@mui/system/styled';

interface DisplayProps {
  direction: 'userNumGoalHan' | 'userHanGoalNum';
  goal: HangulNumber;
  input: string;
  showGoalAnswer: boolean;
  showParsedInput: boolean;
}

const Container = styled('div')({
  width: '100%',
});

const Goal = styled('h1')(({ theme }) => ({
  fontSize: 'clamp(2.2rem, 1.25rem + 3.3333vw, 3rem)',
  minHeight: '3rem',
  width: '100%',
  color: theme.palette.gray['5'],
}));

const GoalAnswer = styled('h2')(({ theme }) => ({
  fontSize: 'clamp(1.5rem, 5vw, 3rem)',
  minHeight: '3rem',
  color: theme.palette.gray['5'],
}));

const ParsedUserInput = styled('h2')(({ theme }) => ({
  fontSize: 'clamp(2rem, 1.25rem + 3.3333vw, 3rem)',
  fontWeight: '400',
  minHeight: '3rem',
  width: '100%',
  fontFamily: 'GowunDodum',
  color: theme.palette.gray['4'],
}));

const styles = {
  hangulAnswer: {
    fontFamily: 'GowunDodum',
    fontWeight: '400',
  },
  numberAnswer: {
    fontFamily: 'BioRhyme',
    fontWeight: '300',
  },
  hangulGoal: {
    fontFamily: 'GowunDodum',
    fontWeight: '700',
  },
  numberGoal: {
    fontFamily: 'BioRhyme',
    fontWeight: '700',
  },
};

export default function Display({ direction, goal, input, showGoalAnswer, showParsedInput }: DisplayProps) {
  return (
    <Container>
      <Goal sx={styles[direction === 'userNumGoalHan' ? 'hangulGoal' : 'numberGoal']}>
        {direction === 'userNumGoalHan' ? goal.hangul : goal.formattedNumber}
      </Goal>
      <GoalAnswer sx={styles[direction === 'userNumGoalHan' ? 'numberAnswer' : 'hangulAnswer']}>
        {showGoalAnswer ? (direction === 'userNumGoalHan' ? goal.formattedNumber : goal.hangul) : ' '}
      </GoalAnswer>
      <ParsedUserInput>
        {showParsedInput && direction === 'userNumGoalHan' && input !== ''
          ? ((): string => {
              try {
                return goal.fromNumber(Number.parseInt(input)).hangul;
              } catch {
                return ' ';
              }
            })()
          : ' '}
      </ParsedUserInput>
    </Container>
  );
}
