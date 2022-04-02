import { useState } from 'react';
import styled from '@mui/system/styled';
import Color from 'lib/color/Color';
import { HiddenLabel, HangulInput, VisibilitySwitch, BlackContainer } from 'lib/components/styled';
import { KeyContainer, KoreanContainer, ColorWheelAnimated } from 'lib/components/color';
import { CSSTransition } from 'react-transition-group';
import { spinIn } from '@/styles/transitions';

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

const ColorWheelContainer = styled('div')({
  position: 'absolute',
  right: '1.5rem',
  top: '1rem',
});

export default function ColorToHangul({
  showKey,
  setShowKey,
  color,
  setColor,
  nextColor,
  setNextColor,
  updateColor,
}: {
  showKey: boolean;
  setShowKey: React.Dispatch<React.SetStateAction<boolean>>;
  color: Color;
  setColor: React.Dispatch<React.SetStateAction<Color | null>>;
  nextColor: Color;
  setNextColor: React.Dispatch<React.SetStateAction<Color | null>>;
  updateColor: () => void;
}): JSX.Element | null {
  // toggles
  const [showKoreanAnswer, setShowKoreanAnswer] = useState(true);
  const [showAnimationWheel, setShowAnimationWheel] = useState(true);
  const [animateColorWheel, setAnimateColorWheel] = useState(false);

  // state
  const [input, setInput] = useState('');

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const val = e.currentTarget.value;
    if (val === color.Korean) {
      setAnimateColorWheel(!animateColorWheel);
      setInput('');
      updateColor();
    } else {
      setInput(val);
    }
  };

  return (
    <Page bg={color.hex}>
      <KoreanContainer showKorean={showKoreanAnswer} Korean={color.Korean} />
      <InputContainer>
        <VisibilitySwitch
          label="한글"
          ariaLabel="Show hangul answer heading."
          showFlag={showKoreanAnswer}
          setShowFlag={setShowKoreanAnswer}
        />
        {showKoreanAnswer ? (
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
      <CSSTransition in={showAnimationWheel} timeout={300} classNames={spinIn}>
        <ColorWheelContainer>
          <ColorWheelAnimated
            onClick={(): void => setShowAnimationWheel(!showAnimationWheel)}
            show={showAnimationWheel}
            hexColor={color.hex}
            nextHexColor={nextColor.hex}
            animationToggle={animateColorWheel}
            height="100px"
            width="100px"
          />
        </ColorWheelContainer>
      </CSSTransition>
    </Page>
  );
}
