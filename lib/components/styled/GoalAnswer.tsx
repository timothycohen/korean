import styled from '@mui/system/styled';

const GoalAnswer = ({
  numOrHan,
  children,
  koreanAriaLabel,
  englishAriaLabel,
  tabIndex,
}: {
  numOrHan: 'num' | 'han';
  children: React.ReactNode;
  koreanAriaLabel: string;
  englishAriaLabel: string;
  tabIndex: number;
}): JSX.Element => {
  const StyledGoalAnswer = styled('h2')(({ theme }) => ({
    fontSize: 'clamp(1.5rem, 5vw, 3rem)',
    minHeight: '4.5rem',
    color: theme.palette.gray['5'],
    fontFamily: numOrHan === 'han' ? 'GowunDodum' : 'BioRhyme',
    fontWeight: numOrHan === 'han' ? '400' : '300',
  }));

  return (
    <StyledGoalAnswer
      aria-label={numOrHan === 'han' ? koreanAriaLabel : englishAriaLabel}
      tabIndex={tabIndex}
      lang={numOrHan === 'han' ? 'ko' : 'en'}
    >
      {children}
    </StyledGoalAnswer>
  );
};

export default GoalAnswer;
