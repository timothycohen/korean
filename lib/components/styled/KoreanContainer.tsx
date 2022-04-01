import styled from '@mui/system/styled';
import { BlackContainer } from '../styled';

export const KoreanContainer = styled(BlackContainer)(({ theme }) => ({
  minWidth: '35%',
  top: '10%',
  left: 'calc(50% - calc(35% / 2))',
  display: 'grid',
  gridAutoFlow: 'column',
  alignItems: 'flex-end',
  wordBreak: 'keep-all',

  '& h1': {
    fontFamily: 'GowunDodum',
    fontSize: '4rem',
    color: theme.palette.primary.main,
  },
}));
