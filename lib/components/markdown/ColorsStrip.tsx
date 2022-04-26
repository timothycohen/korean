import { colorsArray } from 'lib/color/Color';

export default function ColorStrip(): JSX.Element {
  return (
    <>
      {colorsArray.map(color => (
        <div key={color.hex} style={{ backgroundColor: color.hex }}>
          {color.Korean}
        </div>
      ))}
    </>
  );
}
