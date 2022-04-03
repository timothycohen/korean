import styled from '@mui/system/styled';
import Button from '@mui/material/Button';
import { Color, ColorMap } from 'lib/color';
import { BlackContainer } from 'lib/components/styled';
import { useState, useEffect } from 'react';
import { shake as shakeAnimation } from 'styles/transitions';
import ShuffleOnTwoToneIcon from '@mui/icons-material/ShuffleOnTwoTone';

const KeyContainerStyled = styled(BlackContainer)({
  width: '90%',
  top: '35%',
  left: 'calc(50% - calc(90% / 2))',

  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(10rem, 1fr))',
  gap: '1rem',
  padding: '1rem',
});

const shuffle = (array: ColorMap[]): ColorMap[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

interface KeyItemBtnProps {
  theme?: any;
  showkey?: 'true' | 'false';
  c: ColorMap;
}

const getRanVisibleColor = (colors: ColorMap[]): string => {
  let i = 0;
  const lowContrast = ['노란색', '하얀색', '베이지색', '회색'];
  while (lowContrast.includes(colors[i].Korean)) {
    i++;
  }
  return colors[i].hex;
};

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

interface SelectionContainerProps {
  showKey: boolean;
  onClick: (hex: string) => boolean;
}

export default function SelectionContainer({ showKey, onClick }: SelectionContainerProps): JSX.Element {
  const [colors, setColors] = useState(Color.all);
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
      {colors.map(c => {
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
      <Button sx={{ padding: '0rem' }} onClick={(): void => setColors(shuffle(Color.all))}>
        <ShuffleOnTwoToneIcon
          aria-label="shuffle colors"
          sx={{
            fontSize: '5rem',
            color: getRanVisibleColor(colors),
            backgroundColor: 'primary.main',
            borderRadius: '5px',
          }}
        />
      </Button>
    </KeyContainerStyled>
  );
}
