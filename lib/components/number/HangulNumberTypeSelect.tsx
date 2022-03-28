import { HangulNumberOptions } from '../../number/HanNumber';
import { HangulNumber, NativeNumber, SinoNumber } from 'lib/number';

interface HangulNumberTypeSelectProps {
  goal: NativeNumber | SinoNumber;
  setGoal: React.Dispatch<React.SetStateAction<NativeNumber | SinoNumber>>;
}

const styles = {
  optgroup: {
    fontSize: '1.6rem',
  },
  option: {
    fontSize: '1.3rem',
  },
};

export default function HangulNumberTypeSelect({ goal, setGoal }: HangulNumberTypeSelectProps) {
  return (
    <select
      name="hangulNumberType"
      id="hangulNumberType"
      style={{ width: 'clamp(275px, 60%, 450px)', margin: '0, auto' }}
      value={`${goal.type}-${goal.option}`}
      onChange={e => {
        const [type, option] = e.currentTarget.value.split('-') as [
          HangulNumberOptions['type'],
          HangulNumberOptions['option']
        ];
        const num = HangulNumber.create(type, option).setRandom();
        setGoal(num);
      }}
    >
      <optgroup style={styles.optgroup} label="한글 숫자 Native">
        <option style={styles.option} value="native-cardinal">
          Cardinal
        </option>
        <option style={styles.option} value="native-counter">
          Cardinal: Counter
        </option>
        <option style={styles.option} value="native-repetition">
          Ordinal: Repetition
        </option>
        <option style={styles.option} value="native-sequence">
          Ordinal: Sequence
        </option>
      </optgroup>
      <optgroup style={styles.optgroup} label="한자 숫자 Sino">
        <option style={styles.option} value="sino-cardinal">
          Cardinal
        </option>
        <option style={styles.option} value="sino-counter">
          Cardinal: Counter
        </option>
      </optgroup>
    </select>
  );
}
