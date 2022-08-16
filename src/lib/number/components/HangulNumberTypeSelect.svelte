<script lang="ts">
  import type { HangulNumberOptions } from '$number/logic';

  import { goal } from '$number/stores';

  const value = `${$goal.type}-${$goal.option}`;

  type E = Event & {
    currentTarget: EventTarget & HTMLSelectElement;
  };

  const handleChange = (e: E) => {
    const [type, option] = e.currentTarget.value.split('-') as [
      HangulNumberOptions['type'],
      HangulNumberOptions['option']
    ];
    const options = {
      type,
      option,
    } as HangulNumberOptions;
    goal.updateOptions(options);
  };
</script>

<select {value} on:change={handleChange} id="focus-trap-open">
  <optgroup label="한글 숫자 Native">
    <option value="native-cardinal"> Native Cardinal </option>
    <option value="native-counter"> Native Cardinal Counter </option>
    <option value="native-repetition"> Native Ordinal Repetition </option>
    <option value="native-sequence"> Native Ordinal Sequence </option>
  </optgroup>
  <optgroup label="한자 숫자 Sino">
    <option value="sino-cardinal"> Sino Cardinal </option>
    <option value="sino-counter"> Sino Cardinal Counter </option>
  </optgroup>
</select>

<style>
  select {
    width: clamp(275px, 60%, 450px);
    margin: 0, auto;
    background-color: white;
    color: black;
  }
  optgroup {
    font-size: 1.4rem;
  }
  option {
    font-size: 1.1rem;
  }
</style>
