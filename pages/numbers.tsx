import Head from 'next/head';
import { useState, useEffect } from 'react';
import { HangulNumber, NativeNumber, SinoNumber } from '../lib/number';
import { DirectionBtn, Display, HangulNumberTypeSelect, Input, RangeSlider } from '../lib/components/number';
import { VisibilitySwitch, BottomDrawer, WavePage } from '../lib/components/styled';
import Button from '@mui/material/Button';
import styled from '@mui/system/styled';

const Main = styled('main')({
  minHeight: '100%',
  width: '100%',
  paddingTop: '15%',
  margin: '0 auto',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
});

const Heading = styled('h1')(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 700,
  color: theme.palette.primary.main,
}));

const Toggles = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%',
  justifyContent: 'space-around',
  gap: '2rem',
});

const Header = styled('header')({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridAutoFlow: 'column',
});

const SettingsBtn = styled(Button)(({ theme }) => ({
  fontFamily: 'SpaceMono',
  textTransform: 'lowercase',
  backgroundColor: theme.palette.gray['5'],
  border: `4px solid ${theme.palette.primary.main}`,
  borderRadius: '0px',
}));

export default function Numbers() {
  // state
  const [input, setInput] = useState('1');
  const [goal, setGoal] = useState<NativeNumber | SinoNumber>({} as SinoNumber);
  useEffect((): void => {
    setGoal((): NativeNumber | SinoNumber => {
      const num = HangulNumber.create('sino', 'cardinal').setRandom();
      num.range = [0, 7];
      return num;
    });
  }, []);

  // toggles
  const [showParsedInput, setShowParsedInput] = useState(false);
  const [showGoalAnswer, setShowGoalAnswer] = useState(false);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [direction, setDirection] = useState<'userNumGoalHan' | 'userHanGoalNum'>('userNumGoalHan');

  if (!goal.hangul) return null;

  return (
    <WavePage>
      <Head>
        <title>Numbers | {goal.type.replace(/^./, str => str.toUpperCase())}</title>
      </Head>
      <Header>
        <Heading>Korean Numbers</Heading>
        <SettingsBtn onClick={() => setDrawerIsOpen(true)}>Settings</SettingsBtn>
      </Header>
      <BottomDrawer isOpen={drawerIsOpen} setIsOpen={setDrawerIsOpen}>
        <HangulNumberTypeSelect goal={goal} setGoal={setGoal} />

        <RangeSlider goal={goal} setGoal={setGoal} />

        <Toggles>
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
        </Toggles>
      </BottomDrawer>
      <Main>
        <Display
          direction={direction}
          goal={goal}
          input={input}
          showGoalAnswer={showGoalAnswer}
          showParsedInput={showParsedInput}
        />

        <Input
          input={input}
          setInput={setInput}
          direction={direction}
          goal={goal}
          setGoal={setGoal}
          showParsedInput={showParsedInput}
          setShowParsedInput={setShowParsedInput}
        />
        <Toggles>
          <VisibilitySwitch
            showFlag={showGoalAnswer}
            setShowFlag={setShowGoalAnswer}
            label="Answer"
            ariaLabel="Show answer"
          />

          <DirectionBtn direction={direction} setDirection={setDirection} />
        </Toggles>
      </Main>
    </WavePage>
  );
}
