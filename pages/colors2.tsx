import { useState, useEffect } from 'react';
import { Color, ColorMap } from 'lib/color';
import { ColorWheelAnimated } from 'lib/components/color';

export default function Colors2Page(): JSX.Element | null {
  // set initial state on server
  const [color, setColor] = useState<ColorMap | null>(null);
  const [nextColor, setNextColor] = useState<ColorMap | null>(null);
  const [animateColorWheel, setAnimateColorWheel] = useState(false);

  // update initial state on client
  useEffect((): void => {
    setColor(new Color());
    setNextColor(new Color());
  }, []);

  // state on server will be null until useEffect
  if (!color || !nextColor) return null;

  const updateColor = (): void => {
    setAnimateColorWheel(!animateColorWheel);
    const oldNextColor = nextColor;
    let newColor = oldNextColor;
    while (newColor.hex === oldNextColor.hex) {
      newColor = new Color();
    }
    setColor(oldNextColor);
    setNextColor(newColor);
  };

  return (
    <>
      <button onClick={updateColor}>{color.English}</button>
      <div style={{ height: '250px', width: '250px' }}>
        <ColorWheelAnimated
          onClick={updateColor}
          hexColor={color.hex}
          nextHexColor={nextColor.hex}
          animationToggle={animateColorWheel}
        />
      </div>
    </>
  );
}
