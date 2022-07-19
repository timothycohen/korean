import { crossfade } from 'svelte/transition';
import { quintOut } from 'svelte/easing';

export const [CFsend, CFreceive] = crossfade({
  duration: d => Math.sqrt(d * 200),

  fallback(node, _params) {
    const style = getComputedStyle(node);
    const transform = style.transform === 'none' ? '' : style.transform;

    return {
      duration: 200,
      easing: quintOut,
      css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`,
    };
  },
});
