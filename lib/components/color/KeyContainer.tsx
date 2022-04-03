import styled from '@mui/system/styled';
import { fade } from 'styles/transitions';
import { Color } from 'lib/color';
import { BlackContainer } from 'lib/components/styled';
import { useState } from 'react';
import useUpdate from 'lib/hooks/useUpdate';

const KeyContainerStyled = styled(BlackContainer)({
  width: '90%',
  top: '50%',
  left: 'calc(50% - calc(90% / 2))',

  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
  padding: '1rem',
  fontSize: '2rem',
  backgroundColor: 'black',
  justifyContent: 'center',
});

const KeyItemStyled = styled('span')<{ color: string; bg: string }>(({ bg, color }) => ({
  color: color,
  fontFamily: 'GowunDodum',
  backgroundColor: bg,
  borderRadius: '3px',
  fontWeight: '700',
}));

interface KeyContainerProps {
  showKey: boolean;
}

export default function KeyContainer({ showKey }: KeyContainerProps): JSX.Element | null {
  // prevent it lifting on first page load
  const [animationStatus, setAnimationStatus] = useState(false);
  useUpdate((): void => {
    setAnimationStatus(true);
  }, []);

  if (!showKey) return null;
  return (
    <KeyContainerStyled className={`${fade.fade} ${animationStatus ? fade.fadeUpAndIn : undefined}`}>
      {Color.all.map(c => {
        let bg = 'transparent';
        if (c.English === 'black' || c.Korean === '남색' || c.Korean === '보라색') {
          bg = 'white';
        }
        return (
          <KeyItemStyled
            color={c.hex}
            bg={bg}
            key={c.hex}
            tabIndex={showKey ? 0 : -1}
            role="img"
            lang="ko"
            aria-label={`${c.English} is ${c.Korean}`}
          >
            <span lang="ko">{c.Korean}</span>
          </KeyItemStyled>
        );
      })}
    </KeyContainerStyled>
  );
}
