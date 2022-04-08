import Head from 'next/head';
import { useState, useEffect } from 'react';
import { HangulNumber, NativeNumber, SinoNumber, unFormat } from 'lib/number';
import { DirectionBtn, Display, HangulNumberTypeSelect, Input, RangeSlider } from 'lib/components/number';
import {
  VisibilitySwitch,
  BottomDrawer,
  WavePage,
  Heading,
  Main,
  TogglesContainer,
  Header,
  SettingsBtn,
} from 'lib/components/styled';

type DefinedSetGoal = React.Dispatch<React.SetStateAction<NativeNumber | SinoNumber>>;

export default function NumbersPage(): JSX.Element | null {
  // state
  const [goal, setGoal] = useState<NativeNumber | SinoNumber | undefined>();
  const [input, setInput] = useState('1');
  const [parsedInput, setParsedInput] = useState('');

  // toggles
  const [showParsedInput, setShowParsedInput] = useState(false);
  const [showGoalAnswer, setShowGoalAnswer] = useState(false);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [direction, setDirection] = useState<'userNumGoalHan' | 'userHanGoalNum'>('userNumGoalHan');

  // calculate state only on client to prevent server/client mismatch
  useEffect((): void => {
    setGoal((): NativeNumber | SinoNumber => {
      const num = HangulNumber.create('sino', 'cardinal').setRandom();
      num.range = [0, 7];
      return num;
    });
  }, []);

  // wipe the input when settings change
  useEffect((): void => {
    if (!goal?.option) return;
    setInput('');
  }, [direction, goal?.option, goal?.min, goal?.max, goal?.type]);

  // derive parsedInput on input change
  useEffect((): void => {
    if (!goal) return;

    if (direction === 'userHanGoalNum') {
      setParsedInput('');
      return;
    }
    if (input.length === 0) {
      setParsedInput('…');
      return;
    }
    // when the settings change, the input reset to '' will not be triggered before this hook
    // therefore, try catch for out of range numbers
    try {
      setParsedInput(goal.fromNumber(Number.parseInt(input)).hangul);
    } catch {
      setParsedInput('…');
    }
  }, [direction, goal, input, setGoal, setInput]);

  // handle correct answers
  useEffect((): void => {
    if (!goal) return;
    const handleWin = () => {
      const newGoal = HangulNumber.create(goal.type, goal.option);
      newGoal.range = goal.range;
      setGoal(newGoal);
      setInput('');
    };

    if (
      (direction === 'userHanGoalNum' && input === goal.hangul) ||
      (direction === 'userNumGoalHan' && input !== '' && parseInt(unFormat(input)) === goal.number)
    ) {
      handleWin();
    }
  }, [direction, goal, input]);

  if (!goal) return null;

  return (
    <WavePage>
      <Head>
        <title>Numbers | {goal.type.replace(/^./, str => str.toUpperCase())}</title>
      </Head>
      <Header>
        <Heading>Korean Numbers</Heading>
        <SettingsBtn onClick={(): void => setDrawerIsOpen(true)}>Settings</SettingsBtn>
      </Header>
      <BottomDrawer isOpen={drawerIsOpen} setIsOpen={setDrawerIsOpen}>
        <HangulNumberTypeSelect goal={goal} setGoal={setGoal} />

        <RangeSlider goal={goal} setGoal={setGoal as DefinedSetGoal} />

        <TogglesContainer>
          <VisibilitySwitch
            showFlag={showGoalAnswer}
            setShowFlag={setShowGoalAnswer}
            label="Answer"
            ariaLabel="Show answer"
          />

          <DirectionBtn direction={direction} setDirection={setDirection} />

          <VisibilitySwitch
            showFlag={showParsedInput}
            setShowFlag={setShowParsedInput}
            label="Input As Hangul"
            ariaLabel="Show input as hangul"
            disabled={direction !== 'userNumGoalHan'}
          />
        </TogglesContainer>
      </BottomDrawer>
      <Main>
        <Display
          direction={direction}
          goal={goal}
          parsedInput={parsedInput}
          showGoalAnswer={showGoalAnswer}
          showParsedInput={showParsedInput}
        />

        <Input
          input={input}
          setInput={setInput}
          direction={direction}
          goal={goal}
          showParsedInput={showParsedInput}
          setShowParsedInput={setShowParsedInput}
        />
        <TogglesContainer>
          <VisibilitySwitch
            showFlag={showGoalAnswer}
            setShowFlag={setShowGoalAnswer}
            label="Answer"
            ariaLabel="Show answer"
          />

          <DirectionBtn direction={direction} setDirection={setDirection} />
        </TogglesContainer>
      </Main>
    </WavePage>
  );
}
