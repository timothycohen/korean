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
    minWidth: '35%',
    top: '10%',
    left: 'calc(50% - calc(35% / 2))',
    display: 'grid',
    gridAutoFlow: 'column',
    alignItems: 'center',
    wordBreak: 'keep-all',

    '& h1': {
      fontFamily: 'GowunDodum',
      fontSize: '4rem',
      color: color ? color.hex : theme.palette.primary.main,
      backgroundColor:
        color?.English === 'black' || color?.Korean === '남색' || color?.Korean === '보라색'
          ? 'white'
          : 'black',
      borderRadius: '0.5rem',
      padding: '0rem 1rem',
    },
  }));

  return <StyledKoreanContainerColored className={className}>{children}</StyledKoreanContainerColored>;
};
