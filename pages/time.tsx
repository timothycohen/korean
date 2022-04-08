import Head from 'next/head';
import { useState, useEffect } from 'react';
import { HangulTime, type Hour, type Minute } from 'lib/time';
import {
  WavePage,
  VisibilitySwitch,
  TogglesContainer,
  Heading,
  Header,
  GoalAnswer,
  ParsedUserInput,
  Main,
  Goal,
} from 'lib/components/styled';
import { Clock, Input, DirectionBtn } from 'lib/components/time';

export default function TimePage(): JSX.Element | null {
  // state
  const [goal, setGoal] = useState<HangulTime | undefined>();
  const [input, setInput] = useState('');
  const [parsedInput, setParsedInput] = useState('');

  // toggles
  const [showParsedInput, setShowParsedInput] = useState(false);
  const [showGoalAnswer, setShowGoalAnswer] = useState(false);
  const [direction, setDirection] = useState<'userTimeGoalHan' | 'userHanGoalTime'>('userTimeGoalHan');

  // calculate state only on client to prevent server/client mismatch
  useEffect((): void => {
    setGoal(new HangulTime({}));
  }, []);

  // derive parsedInput on input change
  useEffect((): void => {
    if (direction === 'userHanGoalTime') {
      setParsedInput('');
    }
    if (direction === 'userTimeGoalHan') {
      if (input.length === 0 || input === '0') {
        setParsedInput('…');
        return;
      }
      const userHr = Number(input.split(':')[0]) as Hour;
      const userMin = Number(input.split(':')[1]) as Minute;
      const userTime = HangulTime.toHangul(userHr, userMin);
      setParsedInput(userTime);
    }
  }, [direction, input]);

  // handle correct answers
  useEffect((): void => {
    if (!goal) return;

    const handleWin = () => {
      setGoal(new HangulTime({}));
      setInput('');
    };

    if (
      (direction === 'userHanGoalTime' && input === goal.hangul) ||
      (direction === 'userTimeGoalHan' && goal.isMatch(input))
    ) {
      handleWin();
    }
  }, [direction, goal, input, setGoal, setInput]);

  if (!goal) return null;

  return (
    <WavePage>
      <Head>
        <title>Time</title>
      </Head>
      <Header>
        <Heading>Time</Heading>
      </Header>
      <Main>
        {direction === 'userTimeGoalHan' ? (
          <Goal
            numOrHan={'han'}
            koreanAriaLabel={`Goal ${goal.hangul}`}
            englishAriaLabel={`Goal ${goal.HHMM}`}
          >
            {goal.hangul}
          </Goal>
        ) : (
          <Clock hr={goal.hour.toString()} min={goal.minute.toString()} />
        )}

        <GoalAnswer
          numOrHan={direction === 'userHanGoalTime' ? 'han' : 'num'}
          koreanAriaLabel={`Answer ${goal.hangul}`}
          englishAriaLabel={`Answer ${goal.hangul}`}
          tabIndex={showGoalAnswer ? 0 : -1}
        >
          {showGoalAnswer ? (direction === 'userTimeGoalHan' ? goal.HHMM : goal.hangul) : ' '}
        </GoalAnswer>

        <ParsedUserInput
          tabIndex={showParsedInput && direction === 'userTimeGoalHan' ? 0 : -1}
          aria-label={`Your input ${parsedInput}`}
          lang="ko"
        >
          {showParsedInput && parsedInput}
        </ParsedUserInput>

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

          <DirectionBtn
            direction={direction}
            onClick={(): void => {
              setInput('');
              setDirection(direction === 'userTimeGoalHan' ? 'userHanGoalTime' : 'userTimeGoalHan');
            }}
          />
        </TogglesContainer>
      </Main>
    </WavePage>
  );
}
