<script lang="ts">
  import { goal } from '$number/stores';

  import RangeSlider from 'svelte-range-slider-pips';
</script>

<div
  class="slider"
  style={`
--range-slider:          hsla(43, 100%, 91%, .1);     /* slider main background color */
--range-handle-inactive: hsla(43, 100%, 91%, .85);    /* inactive handle color */
--range-handle:          hsla(43, 100%, 91%, .85);    /* non-focused handle color */
--range-handle-focus:    hsla(43, 100%, 75%, .85);    /* focused handle color */
--range-handle-border:   hsla(43, 100%, 50%, .85);
--range-range-inactive:  hsla(43, 100%, 91%, .85);    /* inactive range bar background color */
--range-range:           hsla(43, 100%, 91%, 1);      /* active range bar background color */
--range-float-inactive:  hsla(43, 100%, 91%, .85);    /* inactive floating label background color */
--range-float:           hsla(43, 100%, 91%, .85);    /* floating label background color */
--range-float-text:      white;
`}
>
  <h1>{$goal.formattedRange[0]} - {$goal.formattedRange[1]}</h1>

  <RangeSlider range pushy bind:values={$goal.range} min={$goal.absMin} max={$goal.absMax} step={1} float={true} />
</div>

<style>
  .slider {
    display: grid;
    place-items: center;
    margin: 0 3rem;
  }
  h1 {
    color: var(--primary2);
    font-size: 1.6rem;
    font-weight: 300;
    text-align: center;
    height: 100px;
  }

  @media only screen and (min-width: 500px) {
    h1 {
      font-size: 2.3rem;
      height: 125px;
    }
  }

  @media only screen and (min-width: 650px) {
    h1 {
      font-size: 3rem;
      height: 150px;
    }
  }
</style>
