export type TargetParams = {
  x: number;
  y: number;
  radius?: number;
  type?: 'control1' | 'control2' | 'point';
};

export const createTarget = (params: TargetParams) => {
  const { x, y, radius = 30, type = 'point' } = params;

  return `<circle
  id="target"
  cx="${x}"
  cy="${y}"
  r="${radius}"
  fill="${type === 'control1' ? 'yellow' : type === 'control2' ? 'orange' : 'green'}"
  stroke="#000000"
  stroke-width="1.0"
  stroke-linejoin="round"
  stroke-linecap="butt"
  fill-rule="evenodd"
>
<title>${JSON.stringify(params)}</title>
</circle>`;
};
