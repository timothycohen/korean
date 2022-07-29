<script lang="ts">
  import { colors, allColors } from '$color/stores';
  import { showKey } from '$color/stores';
  import { debounceStore } from '$common/stores';
  import '$animations/shake.css';
  import { CFsend, CFreceive } from '$animations';
  import { flip } from 'svelte/animate';
  import Button from '$common/components/Button.svelte';
  import Icon from '$common/components/Icon.svelte';

  let colorMap = [...$allColors];
  const shakeAnimationIndex = debounceStore(300);

  const shuffle = () => {
    for (let i = colorMap.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [colorMap[i], colorMap[j]] = [colorMap[j], colorMap[i]];
    }
  };

  const getFirstVisibleColor = (colorMap: typeof $allColors) => {
    const lowContrast = ['노란색', '하얀색', '베이지색', '회색'];
    for (let i = 0; i < colorMap.length; i++) {
      if (!lowContrast.includes(colorMap[i].Korean)) return colorMap[i].hex;
    }
  };

  $: calcBG = (color: typeof $colors.color) => {
    let dark = ['까만색', '남색', '보라색'];
    if ($showKey) {
      if (dark.includes(color.Korean)) return 'white';
      return 'black';
    }
    return color.hex;
  };
</script>

<div class="blackContainer selectionContainer">
  {#each colorMap as color, i (color)}
    <span
      class={`shakable${$shakeAnimationIndex === i ? ' shake' : ''}`}
      in:CFreceive={{ key: color }}
      out:CFsend|local={{ key: color }}
      animate:flip={{ duration: 200 }}
    >
      <Button
        ripple={false}
        COMMENT="crossfade & ripples are mutually exclusive here: https://github.com/sveltejs/svelte/issues/3685"
        color={color.hex}
        aria-label={`${color.English} is ${color.Korean}`}
        lang="ko"
        rippleFocus={$showKey ? color.hex : ''}
        bgColor={calcBG(color)}
        bgHover={calcBG(color)}
        on:click={() => {
          if (color.hex === $colors.color.hex) {
            colors.next();
            shuffle();
          } else {
            shakeAnimationIndex.trigger(i);
          }
        }}
      >
        {color.Korean}
      </Button>
    </span>
  {/each}

  {#key getFirstVisibleColor(colorMap)}
    <span class="shuffleBtn">
      <Button
        bgColor={getFirstVisibleColor(colorMap)}
        bgHover={getFirstVisibleColor(colorMap)}
        on:click={shuffle}
        aria-label="shuffle colors"
      >
        <Icon name="shuffle" vbX="16" vbY="16" width="45%" stroke="none" />
      </Button>
    </span>
  {/key}
</div>

<style>
  .selectionContainer {
    width: 90%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    row-gap: 1rem;
    padding: 1rem;
  }

  .selectionContainer :global(button) {
    font-size: 2.5rem;
    font-weight: bolder;
    font-family: GowunDodum;
    word-break: keep-all;
    height: 5rem;
    border-radius: 4px;
    border: 1px solid rgba(255, 242, 209, 0.5);
    outline: 1px solid transparent;
    transition: border, outline 300ms;
    user-select: none;
  }

  .selectionContainer :global(button:hover) {
    border: 1px solid var(--primary2);
    outline: 2px solid var(--primary2);
    transition: none;
  }
</style>
