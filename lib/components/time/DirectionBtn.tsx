import QueryBuilderTwoToneIcon from '@mui/icons-material/QueryBuilderTwoTone';
import { DirectionBtn as StyledDirectionBtn } from 'lib/components/styled';

interface DirectionBtnProps {
  direction: 'userHanGoalTime' | 'userTimeGoalHan';
  onClick: () => void;
}

export default function DirectionBtn({ direction, onClick }: DirectionBtnProps): JSX.Element {
  return (
    <StyledDirectionBtn
      labelLeft={`한글`}
      labelRight={<QueryBuilderTwoToneIcon />}
      direction={direction === 'userHanGoalTime' ? 'left' : 'right'}
      ariaLabel={direction === 'userHanGoalTime' ? 'change to time input' : 'change to hangul input'}
      onClick={onClick}
    />
  );
}
