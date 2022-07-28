import type { Action } from 'svelte/action';

export const clickOutside: Action<HTMLElement, Array<HTMLElement | null> | undefined> = (node, immuneNodes) => {
  const handleClick = (event: MouseEvent) => {
    const containsOriginalNode = node.contains(event.target as HTMLElement);

    const containsImmuneNode =
      immuneNodes?.reduce((prev, curr) => {
        return (prev || curr?.contains(event.target as HTMLElement)) ?? false;
      }, false) ?? false;

    if (!containsOriginalNode && !containsImmuneNode) {
      node.dispatchEvent(new CustomEvent('outclick'));
    }
  };

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    },
  };
};
