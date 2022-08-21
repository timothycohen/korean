<script lang="ts">
  import { colors, allColors, showAnimations } from '$color/stores';
  import { showKey } from '$color/stores';
  import { tempStore } from '$common/stores';
  import '$animations/shake.css';
  import { CFsend, CFreceive } from '$animations';
  import { flip } from 'svelte/animate';
  import Button from '$common/components/Button.svelte';
  import Icon from '$common/components/Icon.svelte';

  let colorMap = [...$allColors];
  const shakeAnimationIndex = tempStore(300);

  const shuffle = () => {
    for (let i = colorMap.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [colorMap[i], colorMap[j]] = [colorMap[j], colorMap[i]];
    }
  };

  const getFirstVisibleColor = (colorMap: typeof $allColors) => {
    const lowContrast = ['노란색', '하얀색', '베이지색', '회색'];
    for (let i = 0; i < colorMap.length; i++) {
      if (!lowContrast.includes(colorMap[i].korean)) return colorMap[i].hex;
    }
  };

  $: calcBG = (color: typeof $colors.color) => {
    let dark = ['까만색', '남색', '보라색'];
    if ($showKey) {
      if (dark.includes(color.korean)) return 'white';
      return 'black';
    }
    return color.hex;
  };
</script>

<div class="black-container selection-container" style="background-color: rgb(0 0 0 / 5%);">
  {#each colorMap as color, i (color)}
    <span
      class={`shakable${$shakeAnimationIndex === i ? ' shake' : ''}`}
      data-key={`${color.hex}:${i}`}
      in:CFreceive={{ key: color }}
      out:CFsend|local={{ key: color }}
      animate:flip={{ duration: 200 }}
    >
      <Button
        ripple={false}
        COMMENT="crossfade & ripples are mutually exclusive here: https://github.com/sveltejs/svelte/issues/3685"
        aria-label={`${color.english} is ${color.korean}`}
        lang="ko"
        rippleFillFocus={!$showKey ? (color.english === 'black' ? 'white' : '') : color.hex}
        --color={color.hex}
        --background-color={calcBG(color)}
        --background-color-h={calcBG(color)}
        on:click={() => {
          if (color.hex === $colors.color.hex) {
            colors.next();
            if ($showAnimations) shuffle();
          } else {
            shakeAnimationIndex.trigger(i);
          }
        }}
      >
        {color.korean}
      </Button>
    </span>
  {/each}

  {#key getFirstVisibleColor(colorMap)}
    <span class="shuffle-btn">
      <Button --background-color={getFirstVisibleColor(colorMap)} on:click={shuffle} aria-label="shuffle colors">
        <Icon name="shuffle" vbX="16" vbY="16" width="33%" stroke="none" />
      </Button>
    </span>
  {/key}
</div>

<style>
  .selection-container {
    width: 95%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(5.5rem, 1fr));
    gap: 1rem;
    padding: 1rem;
  }
  .selection-container :global(.shakable button),
  .selection-container :global(.shuffle-btn button) {
    font-size: 1.1rem;
    font-weight: bolder;
    font-family: var(--font-ko);
    word-break: keep-all;
    width: 100%;
    height: 100%;
    border: 1px solid rgb(255 242 209 / 50%);
    transition: none;
    user-select: none;
  }
  .selection-container :global(.shakable button:hover),
  .selection-container :global(.shakable button:focus-visible),
  .selection-container :global(.shuffle-btn button:focus-visible),
  .selection-container :global(.shuffle-btn button:hover) {
    border: none;
    box-shadow: 0 0 0 2px var(--primary2);
  }

  @media only screen and (min-width: 600px) {
    .selection-container {
      grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
      width: 90%;
    }
    .selection-container :global(.shakable button) {
      font-size: 2.5rem;
    }
  }
</style>
