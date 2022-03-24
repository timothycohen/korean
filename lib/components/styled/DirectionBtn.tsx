import { MouseEventHandler } from 'react';
import Button from '@mui/material/Button';
import { CSSTransition } from 'react-transition-group';
import rotateTransition from '../../../styles/transitions/rotate.module.css';
import styles from './DirectionBtn.module.css';
import ArrowRightAltTwoToneIcon from '@mui/icons-material/ArrowRightAltTwoTone';

interface DirectionBtnProps {
  labelLeft?: JSX.Element | string;
  labelRight?: JSX.Element | string;
  direction: 'left' | 'right';
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function DirectionBtn({
  direction,
  onClick,
  labelLeft,
  labelRight,
}: DirectionBtnProps): JSX.Element {
  return (
    <Button onClick={onClick} className={styles.button}>
      {labelLeft}
      <CSSTransition in={direction === 'left'} timeout={400} classNames={rotateTransition}>
        <div className={styles.arrowContainer}>
          <ArrowRightAltTwoToneIcon className={direction === 'left' ? styles.left : ''} />
        </div>
      </CSSTransition>
      {labelRight}
    </Button>
  );
}
