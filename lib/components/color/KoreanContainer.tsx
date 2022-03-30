import styled from '@mui/system/styled';
import { CSSTransition } from 'react-transition-group';
import { fadeDown } from '../../../styles/transitions';
import { BlackContainer } from '../styled';

const KoreanContainerStyled = styled(BlackContainer)(({ theme }) => ({
  minWidth: '35%',
  top: '10%',
  left: 'calc(50% - calc(35% / 2))',

  '& h1': {
    fontFamily: 'GowunDodum',
    fontSize: '4rem',
    color: theme.palette.primary.main,
  },
}));

export default function KoreanContainer({ showKorean, Korean }: { showKorean: boolean; Korean: string }) {
  return (
    <CSSTransition in={showKorean} timeout={300} classNames={fadeDown}>
      <KoreanContainerStyled>
        <h1 lang="ko">{Korean}</h1>
      </KoreanContainerStyled>
    </CSSTransition>
  );
}
