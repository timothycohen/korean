import Head from 'next/head';
import styles from './numbers.module.css';
import { useEffect, useState } from 'react';
import {
  getRandomHangulNumber,
  numToHangul,
  isValidHangulNumber,
  type HangulNumber,
  type HangulNumberType,
  type HangulNumberOptions,
} from '../lib/numbers';
import { format } from 'lib/utils';

export default function Numbers() {
  const [input, setInput] = useState('');
  const [showInputFlag, setShowInputFlag] = useState(true);
  const [goal, setGoal] = useState({} as HangulNumber);
  const [showGoalFlag, setShowGoalFlag] = useState(false);
  const [hangulNumberType, setHangulNumberType] = useState<HangulNumberType>('sino');
  const [hangulNumberOption, setHangulNumberOption] = useState<HangulNumberOptions>('cardinal');

  useEffect(() => {
    setGoal(getRandomHangulNumber(hangulNumberType, hangulNumberOption));
  }, [hangulNumberType, hangulNumberOption]);

  useEffect(() => {
    const reset = () => {
      setInput('');
      setGoal(getRandomHangulNumber(hangulNumberType, hangulNumberOption));
    };

    const handleWin = () => {
      console.log('correct!', input, goal.number.toString());
      reset();
    };

    if (Number.isInteger(goal.number) && input === goal.number.toString()) handleWin();
  }, [hangulNumberType, hangulNumberOption, input, goal.number]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Cards | Numbers | {hangulNumberType.replace(/^./, str => str.toUpperCase())}</title>
      </Head>
      <header className={styles.header}>
        <h1 className={styles.title}>{hangulNumberType.replace(/^./, str => str.toUpperCase())} Numbers</h1>
        <select
          className={styles.select}
          name="hangulNumberType"
          id="hangulNumberType"
          value={`${hangulNumberType}-${hangulNumberOption}`}
          onChange={e => {
            const [type, option] = e.currentTarget.value.split('-');
            setHangulNumberType(type as HangulNumberType);
            setHangulNumberOption(option as HangulNumberOptions);
          }}
        >
          <optgroup label="Native">
            <option value="native-cardinal">Cardinal</option>
            <option value="native-counter">Cardinal: Counter</option>
            <option value="native-repetition">Ordinal: Repetition</option>
            <option value="native-sequence">Ordinal: Sequence</option>
          </optgroup>
          <optgroup label="Sino">
            <option value="sino-cardinal">Cardinal</option>
            <option value="sino-counter">Cardinal: Counter</option>
          </optgroup>
        </select>
        <div className={styles.checkbox}>
          <input
            className={styles.checkbox__input}
            id="showHangul"
            type="checkbox"
            checked={showInputFlag}
            onChange={() => setShowInputFlag(!showInputFlag)}
          />
          <label htmlFor="showHangul" className={styles.checkbox__label}>
            Display Input Hangul
          </label>
        </div>
      </header>
      <main className={styles.main}>
        <h2 className={styles.goalHangul}>{goal.hangul}</h2>
        <h2 className={styles.goalNumber}>{showGoalFlag && format(goal.number)} </h2>

        <input
          className={styles.numberInput}
          type="text"
          value={input}
          onChange={e => {
            const val = e.target.value.replaceAll(/\s/g, '');
            if (val === '' || isValidHangulNumber(val, hangulNumberType)) setInput(val);
          }}
        />

        <h1 className={styles.userHangul}>
          {showInputFlag && input !== ''
            ? numToHangul(Number.parseInt(input), hangulNumberType, hangulNumberOption).hangul
            : ' '}
        </h1>

        <button type="button" onClick={() => setShowGoalFlag(!showGoalFlag)}>
          {showGoalFlag ? 'Hide Answer' : 'Show Answer'}
        </button>
      </main>
    </div>
  );
}
