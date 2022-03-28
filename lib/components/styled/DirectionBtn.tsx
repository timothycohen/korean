import { MouseEventHandler } from 'react';
import Button from '@mui/material/Button';
import { CSSTransition } from 'react-transition-group';
import rotateTransition from '../../../styles/transitions/rotate.module.css';
import RightArrow from '@mui/icons-material/ArrowRightAltTwoTone';
import styled from '@mui/system/styled';

interface DirectionBtnProps {
  labelLeft?: JSX.Element | string;
  labelRight?: JSX.Element | string;
  direction: 'left' | 'right';
  onClick: MouseEventHandler<HTMLButtonElement>;
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
      <CSSTransition in={direction === 'left'} timeout={400} classNames={rotateTransition}>
        <div style={{ display: 'grid' }}>{direction === 'left' ? <LeftArrow /> : <RightArrow />}</div>
      </CSSTransition>
      {labelRight}
    </Button>
  );
}
