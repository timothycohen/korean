import Head from 'next/head';
import { useEffect, useState } from 'react';
import styled from '@mui/system/styled';
import Color from '../lib/color/Color';
import { HiddenLabel, HangulInput, VisibilitySwitch, BlackContainer } from '../lib/components/styled';
import KeyContainer from 'lib/components/color/KeyContainer';
import KoreanContainer from 'lib/components/color/KoreanContainer';

const Page = styled('main')<{ bg: string }>(({ bg }) => ({
  height: '100%',
  minHeight: '100vh',
  backgroundColor: bg,
}));

const InputContainer = styled(BlackContainer)({
  width: '90%',
  height: '6rem',
  top: '30%',
  left: 'calc(50% - calc(90% / 2))',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
});

const Input = styled(HangulInput)(({ theme }) => ({
  width: '50%',
  border: `1px solid ${theme.palette.gray['5']}`,
  fontSize: '3rem',
  padding: '2rem',
  backgroundColor: 'black',
  color: theme.palette.primary.main,
  '&:focus-visible': {
    border: '1px solid transparent',
    outline: `2px solid ${theme.palette.gray['4']}`,
  },
}));

export default function ColorsPage(): JSX.Element | null {
  const [input, setInput] = useState('');
  const [showKorean, setShowKorean] = useState(true);
  const [showKey, setShowKey] = useState(true);
  const [color, setColor] = useState<Color | null>(null);

  useEffect((): void => {
    setColor(new Color());
  }, []);

  if (!color) return null;

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const val = e.currentTarget.value;
    if (val === color.Korean) {
      setColor(new Color());
      setInput('');
    } else {
      setInput(val);
    }
  };

  return (
    <Page bg={color.hex}>
      <Head>
        <title>Colors</title>
      </Head>
      <KoreanContainer showKorean={showKorean} Korean={color.Korean} />
      <InputContainer>
        <VisibilitySwitch
          label="한글"
          ariaLabel="Show hangul answer heading."
          showFlag={showKorean}
          setShowFlag={setShowKorean}
        />
        {showKorean ? (
          <HiddenLabel htmlFor="koreanColor">
            Type {color.English} in hangul. <span lang="ko">{color.Korean}</span>
          </HiddenLabel>
        ) : (
          <HiddenLabel htmlFor="koreanColor">Type {color.English} in hangul.</HiddenLabel>
        )}
        <Input
          id="koreanColor"
          type="text"
          lang="ko"
          value={input}
          onChange={changeInput}
          key={color.hex}
          autoFocus={true}
          autoComplete="off"
        />
        <VisibilitySwitch label="Key" ariaLabel="Show Key" showFlag={showKey} setShowFlag={setShowKey} />
      </InputContainer>
      <KeyContainer showKey={showKey} />
    </Page>
  );
}
