import styled from '@mui/system/styled';

const Goal = ({
  numOrHan,
  children,
  koreanAriaLabel,
  englishAriaLabel,
}: {
  numOrHan: 'num' | 'han';
  children: React.ReactNode;
  koreanAriaLabel: string;
  englishAriaLabel: string;
}): JSX.Element => {
  const StyledGoal = styled('h1')(({ theme }) => ({
    fontSize: 'clamp(1.8rem, 1.25rem + 3.3333vw, 3rem)',
    minHeight: '3rem',
    width: '100%',
    color: theme.palette.gray['5'],
    fontFamily: numOrHan === 'han' ? 'GowunDodum' : 'BioRhyme',
    fontWeight: '700',
  }));

  return (
    <StyledGoal
      aria-label={numOrHan === 'han' ? koreanAriaLabel : englishAriaLabel}
      tabIndex={0}
      lang={numOrHan === 'han' ? 'ko' : 'en'}
    >
      {children}
    </StyledGoal>
  );
};

export default Goal;
