import Head from 'next/head';
import { useEffect, useState } from 'react';
import styled from '@mui/system/styled';
import Color from '../lib/color/Color';
import { HiddenLabel, HangulInput, VisibilitySwitch } from '../lib/components/styled';
import { CSSTransition } from 'react-transition-group';
import { fadeUp, fadeDown } from '../styles/transitions';

const Page = styled('main')<{ bg: string }>(({ bg }) => ({
  height: '100%',
  minHeight: '100vh',
  backgroundColor: bg,
}));

const Container = styled('div')(({ theme }) => ({
  backgroundColor: 'black',
  borderRadius: '5px',
  margin: '0 auto',
  textAlign: 'center',
  position: 'absolute',
  boxShadow: `${theme.palette.gray['3']} 0px 1px 0px`,
}));

const KoreanContainer = styled(Container)(({ theme }) => ({
  minWidth: '35%',
  top: '10%',
  left: 'calc(50% - calc(35% / 2))',

  '& h1': {
    fontFamily: 'GowunDodum',
    fontSize: '4rem',
    color: theme.palette.primary.main,
  },
}));

const InputContainer = styled(Container)({
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

const KeyContainer = styled(Container)({
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

const KeyItem = styled('span')<{ color: string; bg: string }>(({ bg, color }) => ({
  color: color,
  fontFamily: 'GowunDodum',
  backgroundColor: bg,
  borderRadius: '3px',
  fontWeight: '700',
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
      <CSSTransition in={showKorean} timeout={300} classNames={fadeDown}>
        <KoreanContainer>
          <h1 lang="ko">{color.Korean}</h1>
        </KoreanContainer>
      </CSSTransition>
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
      <CSSTransition in={showKey} timeout={300} classNames={fadeUp}>
        <KeyContainer>
          {Color.all.map(c => {
            let bg = 'transparent';
            if (c.English === 'black' || c.Korean === '남색' || c.Korean === '보라색') {
              bg = 'white';
            }
            return (
              <KeyItem
                color={c.hex}
                bg={bg}
                key={c.hex}
                tabIndex={showKey ? 0 : -1}
                role="img"
                lang="ko"
                aria-label={`${c.English} is ${c.Korean}`}
              >
                <span lang="ko">{c.Korean}</span>
              </KeyItem>
            );
          })}
        </KeyContainer>
      </CSSTransition>
    </Page>
  );
}
