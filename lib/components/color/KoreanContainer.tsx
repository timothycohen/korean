import { CSSTransition } from 'react-transition-group';
import { fadeDown } from 'styles/transitions';
import { KoreanContainer as KoreanContainerStyled } from 'lib/components/styled';

export default function KoreanContainer({
  showKorean,
  Korean,
  children,
}: {
  showKorean: boolean;
  Korean: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <CSSTransition in={showKorean} timeout={300} classNames={fadeDown}>
      <KoreanContainerStyled sx={{ justifyContent: children ? 'space-around' : 'center' }}>
        <h1 lang="ko">{Korean}</h1>
        {children}
      </KoreanContainerStyled>
    </CSSTransition>
  );
}
