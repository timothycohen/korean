import { ColorWheel } from './ColorWheel';
import { CSSTransition } from 'react-transition-group';
import { spinIn } from '../../../styles/transitions';
import styled from '@mui/system/styled';

const Container = styled('div')({
  height: '100%',
  width: '100%',
});

const Overlay = styled(Container)({
  position: 'relative',
  top: '-100%',
});

const Button = styled('button')(({ height, width }: { height?: string; width?: string }) => ({
  display: 'block',
  backgroundColor: 'transparent',
  overflow: 'hidden',
  border: 'none',
  cursor: 'pointer',
  height: height ?? '100%',
  width: width ?? '100%',
}));

const ColorWheelContainer = styled('div')(({ height, width }: { height?: string; width?: string }) => ({
  height: height ?? '100%',
  width: width ?? '100%',
}));

interface ColorWheelAnimatedProps {
  hexColor: string;
  nextHexColor: string;
  animationToggle: boolean;
  onClick?: () => void;
  height?: string;
  width?: string;
}

export function ColorWheelAnimated({
  hexColor,
  nextHexColor,
  animationToggle,
  onClick,
  height,
  width,
}: ColorWheelAnimatedProps): JSX.Element {
  const Contents = (
    <>
      <CSSTransition in={animationToggle} timeout={300} classNames={spinIn}>
        <Container>
          <ColorWheel hex={animationToggle ? hexColor : nextHexColor} />
        </Container>
      </CSSTransition>
      <CSSTransition in={!animationToggle} timeout={300} classNames={spinIn}>
        <Overlay>
          <ColorWheel hex={!animationToggle ? hexColor : nextHexColor} />
        </Overlay>
      </CSSTransition>
    </>
  );

  return onClick ? (
    <Button type="button" onClick={onClick} height={height} width={width}>
      {Contents}
    </Button>
  ) : (
    <ColorWheelContainer height={height} width={width}>
      {Contents}
    </ColorWheelContainer>
  );
}
