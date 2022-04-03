import Head from 'next/head';
import { useState, useEffect } from 'react';
import { HangulToColor, ColorToHangul } from 'lib/components/color';
import { DirectionBtn } from 'lib/components/styled';
import { Color } from 'lib/color';
import styled from '@emotion/styled';

const DirectionButtonContainer = styled('div')({
  position: 'absolute',
  left: '1.5rem',
  top: 'calc(1rem + 25px)',
});

export default function Colors2Page(): JSX.Element | null {
  // toggles
  const [direction, setDirection] = useState<'colorToHangul' | 'hangulToColor'>('hangulToColor');
  const [showKey, setShowKey] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  // set initial server state
  const [color, setColor] = useState<Color | null>(null);
  const [nextColor, setNextColor] = useState<Color | null>(null);

  // update initial client state
  useEffect((): void => {
    let color = new Color();
    while (color.English === 'white') {
      color = new Color();
    }
    setColor(color);
    setNextColor(new Color());
  }, [setColor]);

  // state on server will be null until useEffect
  if (!color || !nextColor) return null;

  const updateColor = (): void => {
    const oldNextColor = nextColor;
    let newColor = oldNextColor;
    while (newColor.hex === oldNextColor.hex) {
      newColor = new Color();
    }
    setColor(oldNextColor);
    setNextColor(newColor);
  };

  const props = {
    showKey,
    setShowKey,
    showAnswer,
    setShowAnswer,
    color,
    updateColor,
  };

  const Page =
    direction === 'colorToHangul' ? (
      <ColorToHangul {...props} nextColor={nextColor} />
    ) : (
      <HangulToColor {...props} />
    );

  return (
    <>
      <Head>
        <title>Colors</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <DirectionButtonContainer>
        <DirectionBtn
          direction={direction === 'colorToHangul' ? 'left' : 'right'}
          onClick={() => {
            setDirection(direction === 'colorToHangul' ? 'hangulToColor' : 'colorToHangul');
          }}
          labelLeft={'한글'}
          labelRight={'Color'}
          ariaLabel={'TODO'} // todo
        />
      </DirectionButtonContainer>
      {Page}
    </>
  );
}
