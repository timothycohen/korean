import { useMemo, useState } from 'react';
import styled from '@mui/system/styled';
import { CSSTransition } from 'react-transition-group';
import { spinIn } from '@/styles/transitions';
import { Color } from 'lib/color';
import { HiddenLabel, HangulInput, VisibilitySwitch, BlackContainer } from 'lib/components/styled';
import { KeyContainer, ColorWheelAnimated, KoreanContainer } from 'lib/components/color';

const StyledPage = styled('main')<{ bg: string }>(({ bg }) => ({
  height: '100%',
  minHeight: '100vh',
  backgroundColor: bg,
  display: 'grid',
  padding: '1rem 0',
  gridTemplateRows: '1fr 1fr 1fr',
  gridTemplateAreas: `"answerDisplay" "inputDisplay" "keyDisplay"`,
  placeItems: 'center',
}));

const StyledInputContainer = styled(BlackContainer)(({ theme }) => ({
  width: '90%',
  padding: '1rem',

  display: 'grid',
  placeItems: 'center',

  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: '1fr 1fr',
  gridTemplateAreas: `"textInput textInput" "keySwitch answerSwitch"`,

  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'auto 1fr auto',
    gridTemplateRows: '1fr',
    gridTemplateAreas: `"keySwitch textInput answerSwitch"`,
  },
}));

const StyledInput = styled(HangulInput)(({ theme }) => ({
  gridArea: 'textInput',
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

const StyledAnswerDisplayGridItem = styled('div')({
  gridArea: 'answerDisplay',
  minWidth: '18rem',
  alignSelf: 'end',
});

const StyledKeyDisplayGridItem = styled('div')({
  gridArea: 'keyDisplay',
  alignSelf: 'start',
});

const StyledAnswerSwitchGridItem = styled('div')({
  gridArea: 'answerSwitch',
});

const StyledKeySwitchGridItem = styled('div')({
  gridArea: 'keySwitch',
});

const StyledColorWheelContainer = styled('div')({
  position: 'absolute',
  right: '1.5rem',
  top: '1rem',
});

export default function ColorToHangul({
  showKey,
  setShowKey,
  showAnswer,
  setShowAnswer,
  color,
  updateColor,
  nextColor,
}: {
  showKey: boolean;
  setShowKey: React.Dispatch<React.SetStateAction<boolean>>;
  showAnswer: boolean;
  setShowAnswer: React.Dispatch<React.SetStateAction<boolean>>;
  color: Color;
  nextColor: Color;
  updateColor: () => void;
}): JSX.Element | null {
  // toggles
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

  // prevent rerendering (and playing animation) when parent rerenders. It will still rerender (and animate) when the color changes
  const KoreanContainerMemo = useMemo(() => {
    return (
      <StyledAnswerDisplayGridItem>
        <KoreanContainer color={color} showAnswer={showAnswer} />
      </StyledAnswerDisplayGridItem>
    );
  }, [color, showAnswer]);

  const KeyContainerMemo = useMemo(() => {
    return (
      <StyledKeyDisplayGridItem>
        <KeyContainer showKey={showKey} />
      </StyledKeyDisplayGridItem>
    );
  }, [showKey]);

  const HiddenInputLabel = showAnswer ? (
    <HiddenLabel htmlFor="koreanColor">
      Type {color.English} in hangul. <span lang="ko">{color.Korean}</span>
    </HiddenLabel>
  ) : (
    <HiddenLabel htmlFor="koreanColor">Type {color.English} in hangul.</HiddenLabel>
  );

  const ShowKeySwitch = (
    <StyledKeySwitchGridItem>
      <VisibilitySwitch
        label="Key"
        ariaLabel="Show Key"
        showFlag={showKey}
        setShowFlag={(): void => {
          setShowKey(!showKey);
        }}
      />
    </StyledKeySwitchGridItem>
  );

  const ShowAnswerSwitch = (
    <StyledAnswerSwitchGridItem>
      <VisibilitySwitch
        label="Answer"
        ariaLabel="Show hangul answer heading."
        showFlag={showAnswer}
        setShowFlag={setShowAnswer}
      />
    </StyledAnswerSwitchGridItem>
  );

  const TextInput = (
    <StyledInput
      id="koreanColor"
      type="text"
      lang="ko"
      value={input}
      onChange={changeInput}
      key={color.hex}
      autoFocus={true}
      autoComplete="off"
    />
  );

  const InputContainer = (
    <StyledInputContainer>
      {HiddenInputLabel}
      {ShowKeySwitch}
      {TextInput}
      {ShowAnswerSwitch}
    </StyledInputContainer>
  );

  const ColorWheel = (
    <CSSTransition in={showAnimationWheel} timeout={300} classNames={spinIn}>
      <StyledColorWheelContainer>
        <ColorWheelAnimated
          onClick={(): void => setShowAnimationWheel(!showAnimationWheel)}
          show={showAnimationWheel}
          hexColor={color.hex}
          nextHexColor={nextColor.hex}
          animationToggle={animateColorWheel}
          height="100px"
          width="100px"
        />
      </StyledColorWheelContainer>
    </CSSTransition>
  );

  return (
    <StyledPage bg={color.hex}>
      {ColorWheel}
      {KoreanContainerMemo}
      {InputContainer}
      {KeyContainerMemo}
    </StyledPage>
  );
}
