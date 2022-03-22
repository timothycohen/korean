import Head from 'next/head';
import styles from './numbers.module.css';
import { useEffect, useState } from 'react';
import { HangulNumber, type HangulNumberOptions } from 'lib/number';
import { format } from 'lib/number/utils';

export default function Numbers() {
  const [input, setInput] = useState('');
  const [showInputFlag, setShowInputFlag] = useState(true);
  const [showGoalFlag, setShowGoalFlag] = useState(false);
  const [hangulNumberOptions, setHangulNumberOptions] = useState<HangulNumberOptions>({
    type: 'native',
    option: 'repetition',
  });
  const [goal, setGoal] = useState(
    HangulNumber.create(hangulNumberOptions.type, hangulNumberOptions.option).setRandom()
  );

  // set new goal when options are changed
  useEffect(() => {
    setGoal(HangulNumber.create(hangulNumberOptions.type, hangulNumberOptions.option).setRandom());
  }, [hangulNumberOptions.type, hangulNumberOptions.option]);

  const handleWin = () => {
    console.log('correct!', input, goal.number.toString());
    setInput('');
    setGoal(goal.setRandom());
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Cards | Numbers | {hangulNumberOptions.type.replace(/^./, str => str.toUpperCase())}</title>
      </Head>
      <header className={styles.header}>
        <h1 className={styles.title}>
          {hangulNumberOptions.type.replace(/^./, str => str.toUpperCase())} Numbers
        </h1>
        <select
          className={styles.select}
          name="hangulNumberType"
          id="hangulNumberType"
          value={`${hangulNumberOptions.type}-${hangulNumberOptions.option}`}
          onChange={e => {
            const [type, option] = e.currentTarget.value.split('-');
            setInput(''); // to prevent out of range issues
            setHangulNumberOptions({ type, option } as HangulNumberOptions);
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
        <h2 className={styles.goalNumber}>{showGoalFlag && goal.formattedNumber} </h2>

        <input
          className={styles.numberInput}
          type="text"
          value={input === '' ? '' : format(parseInt(input))}
          onChange={e => {
            // this may not unformat Chinese / Arabic options on the Intl formatter
            const val = e.target.value.replaceAll(/\s/g, '').replaceAll('.', '').replaceAll(',', '');
            if (val === '' || goal.isValid(val)) {
              setInput(val);
              if (val === goal.number.toString()) handleWin();
            }
          }}
        />

        <h1 className={styles.userHangul}>
          {showInputFlag && input !== '' ? goal.fromNumber(Number.parseInt(input)).hangul : ' '}
        </h1>

        <button type="button" onClick={() => setShowGoalFlag(!showGoalFlag)}>
          {showGoalFlag ? 'Hide Answer' : 'Show Answer'}
        </button>
      </main>
    </div>
  );
}
