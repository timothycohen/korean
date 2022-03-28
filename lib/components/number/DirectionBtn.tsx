import { DirectionBtn as StyledDirectionBtn } from '../styled';
import LooksOneTwoToneIcon from '@mui/icons-material/LooksOneTwoTone';
import { Dispatch, SetStateAction } from 'react';

interface DirectionBtnProps {
  direction: 'userHanGoalNum' | 'userNumGoalHan';
  setDirection: Dispatch<SetStateAction<'userHanGoalNum' | 'userNumGoalHan'>>;
}

export default function DirectionBtn({ direction, setDirection }: DirectionBtnProps): JSX.Element {
  return (
    <StyledDirectionBtn
      labelLeft={`한글`}
      labelRight={<LooksOneTwoToneIcon />}
      direction={direction === 'userHanGoalNum' ? 'left' : 'right'}
      ariaLabel={direction === 'userHanGoalNum' ? 'change to number input' : 'change to hangul input'}
      onClick={() => {
        setDirection(direction === 'userNumGoalHan' ? 'userHanGoalNum' : 'userNumGoalHan');
      }}
    />
  );
}
