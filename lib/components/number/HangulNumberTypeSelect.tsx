import { HangulNumberOptions } from '../../number/HanNumber';
import { HangulNumber, NativeNumber, SinoNumber } from 'lib/number';

interface HangulNumberTypeSelectProps {
  goal: NativeNumber | SinoNumber;
  setGoal: React.Dispatch<React.SetStateAction<NativeNumber | SinoNumber>>;
}

const styles = {
  optgroup: {
    fontSize: '1.4rem',
  },
  option: {
    fontSize: '1.1rem',
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
          Native Cardinal
        </option>
        <option style={styles.option} value="native-counter">
          Native Cardinal Counter
        </option>
        <option style={styles.option} value="native-repetition">
          Native Ordinal Repetition
        </option>
        <option style={styles.option} value="native-sequence">
          Native Ordinal Sequence
        </option>
      </optgroup>
      <optgroup style={styles.optgroup} label="한자 숫자 Sino">
        <option style={styles.option} value="sino-cardinal">
          Sino Cardinal
        </option>
        <option style={styles.option} value="sino-counter">
          Sino Cardinal Counter
        </option>
      </optgroup>
    </select>
  );
}
