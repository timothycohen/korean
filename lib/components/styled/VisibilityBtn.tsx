import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import { Dispatch, SetStateAction } from 'react';
import Button from '@mui/material/Button';

interface VisibilityBtnProps {
  showFlag: boolean;
  setShowFlag: Dispatch<SetStateAction<boolean>>;
  label: string;
}

export default function VisibilityBtn({ showFlag, setShowFlag, label }: VisibilityBtnProps) {
  return (
    <Button type="button" onClick={() => setShowFlag(!showFlag)}>
      {label}
      {showFlag ? <VisibilityOffTwoToneIcon /> : <VisibilityTwoToneIcon />}
    </Button>
  );
}
