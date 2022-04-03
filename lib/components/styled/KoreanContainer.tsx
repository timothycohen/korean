import styled from '@mui/system/styled';
import { BlackContainer } from 'lib/components/styled';
import { ColorMap } from 'lib/color';

export const KoreanContainer = ({
  color,
  children,
  className,
}: {
  color?: ColorMap;
  children?: React.ReactNode;
  className?: string;
}): JSX.Element => {
  const StyledKoreanContainerColored = styled(BlackContainer)(({ theme }) => ({
    display: 'grid',
    alignItems: 'center',
    wordBreak: 'keep-all',

    [theme.breakpoints.up('sm')]: {
      lineHeight: '1.4',
      gridAutoFlow: 'column',
      alignItems: 'end',
      gap: '.75rem',
    },
    '& h1': {
      fontFamily: 'GowunDodum',
      fontSize: '4rem',
      color: color ? color.hex : theme.palette.primary.main,
      backgroundColor:
        color?.English === 'black' || color?.Korean === '남색' || color?.Korean === '보라색'
          ? 'white'
          : 'black',
      borderRadius: '4px',
      padding: '0rem 1rem',
      [theme.breakpoints.up('sm')]: {
        fontSize: '5rem',
      },
    },
  }));

  return <StyledKoreanContainerColored className={className}>{children}</StyledKoreanContainerColored>;
};
