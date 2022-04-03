import styled from '@mui/system/styled';
import Button from '@mui/material/Button';
import RightArrow from '@mui/icons-material/ArrowRightAltTwoTone';
import { CSSTransition } from 'react-transition-group';
import { rotate } from 'styles/transitions';

interface DirectionBtnProps {
  labelLeft?: JSX.Element | string;
  labelRight?: JSX.Element | string;
  direction: 'left' | 'right';
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  ariaLabel: string;
}

const LeftArrow = styled(RightArrow)({
  transform: 'rotate(180deg)',
  transforOrigin: 'center',
});

export default function DirectionBtn({
  direction,
  onClick,
  labelLeft,
  labelRight,
  ariaLabel,
}: DirectionBtnProps): JSX.Element {
  return (
    <Button variant="contained" onClick={onClick} aria-label={ariaLabel}>
      <span style={{ fontFamily: 'GowunDodum', fontSize: '1.2rem', fontWeight: '700' }}>{labelLeft}</span>
      <CSSTransition in={direction === 'left'} timeout={400} classNames={rotate}>
        <div style={{ display: 'grid' }}>{direction === 'left' ? <LeftArrow /> : <RightArrow />}</div>
      </CSSTransition>
      {labelRight}
    </Button>
  );
}
