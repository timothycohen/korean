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
      onClick={() => {
        setDirection(direction === 'userNumGoalHan' ? 'userHanGoalNum' : 'userNumGoalHan');
      }}
    />
  );
}
