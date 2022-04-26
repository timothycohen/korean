import { Button } from '@mui/material';
import { ReviewingGrade } from 'lib/SR';

export default function Buttons({
  markOptions,
  onClick,
}: {
  markOptions: ReviewingGrade[];
  onClick: (grade: ReviewingGrade) => Promise<void>;
}): JSX.Element {
  return (
    <>
      {markOptions.map(grade => {
        return (
          <Button
            key={grade}
            type="button"
            variant="contained"
            color="primary"
            onClick={(): Promise<void> => onClick(grade)}
          >
            {grade}
          </Button>
        );
      })}
    </>
  );
}
