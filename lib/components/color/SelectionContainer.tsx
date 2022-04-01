import styled from '@mui/system/styled';
import Button from '@mui/material/Button';
import { Color, ColorMap } from 'lib/color';
import { BlackContainer } from 'lib/components/styled';
import { useState, useEffect } from 'react';
import { shake as shakeAnimation } from 'styles/transitions';

const KeyContainerStyled = styled(BlackContainer)({
  width: '90%',
  top: '35%',
  left: 'calc(50% - calc(90% / 2))',

  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(10rem, 1fr))',
  gap: '1rem',
  padding: '1rem',
});

interface KeyItemBtnProps {
  theme?: any;
  showkey?: 'true' | 'false';
  c: ColorMap;
}

const KeyItemBtn = styled(Button, {
  shouldForwardProp: () => true,
})(({ theme, showkey, c }: KeyItemBtnProps) => {
  let shown = {
    color: c.hex,
    backgroundColor:
      c.English === 'black' || c.Korean === '남색' || c.Korean === '보라색' ? 'white' : 'black',
    fontSize: '3rem',
    fontWeight: 'bolder',
    fontFamily: 'GowunDodum',
    wordBreak: 'keep-all',
    height: '5rem',
  };

  let hidden = { ...shown, color: c.hex, backgroundColor: c.hex };

  let hover = {
    outline: `2px solid ${theme.palette.primary.main}`,
  };

  return showkey === 'true'
    ? { ...shown, '&:hover': { ...shown, ...hover } }
    : { ...hidden, '&:hover': { ...hidden, ...hover } };
});

export default function SelectionContainer({
  showKey,
  onClick,
}: {
  showKey: boolean;
  onClick: (hex: string) => boolean;
}): JSX.Element {
  const [shake, setShake] = useState('');

  useEffect(() => {
    if (shake) {
      setTimeout(() => {
        setShake('');
      }, 300);
    }
  });

  return (
    <KeyContainerStyled>
      {Color.all.map(c => {
        return (
          <KeyItemBtn
            key={c.hex}
            variant="outlined"
            c={c}
            showkey={showKey ? 'true' : 'false'}
            lang="ko"
            aria-label={`${c.English} is ${c.Korean}`}
            className={shake === c.hex ? shakeAnimation.shake : ''}
            onClick={(): void => {
              let correct = onClick(c.hex);
              if (!correct) setShake(c.hex);
            }}
          >
            {c.Korean}
          </KeyItemBtn>
        );
      })}
    </KeyContainerStyled>
  );
}
