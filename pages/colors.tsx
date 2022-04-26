import Head from 'next/head';
import { useState } from 'react';
import { HangulToColor, ColorToHangul } from 'lib/components/color';
import { DirectionBtn } from 'lib/components/styled';
import styled from '@mui/system/styled';

import { type Color } from '@/pages/api/color/getColor';
const path = '/api/color/getColor';

const DirectionButtonContainer = styled('div')({
  position: 'absolute',
  left: '1.5rem',
  top: 'calc(1rem + 25px)',
});

export async function getServerSideProps(): Promise<{
  props: {
    colorProp: Color;
    nextColorProp: Color;
  };
}> {
  const res = await fetch(`${process.env.NEXTAUTH_URL}${path}`);
  const { color, nextColor } = (await res.json()) as {
    color: { color: Color };
    nextColor: { color: Color };
  };

  return {
    props: {
      colorProp: color.color,
      nextColorProp: nextColor.color,
    },
  };
}

const getNewColor = async (oldColorHex: String): Promise<Color> => {
  const res = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ oldColorHex }),
  });

  const {
    color: { color },
  } = (await res.json()) as { color: { color: Color } };

  return color;
};

export default function ColorsPage({
  colorProp,
  nextColorProp,
}: {
  colorProp: Color;
  nextColorProp: Color;
  ColorProp: Color;
}): JSX.Element {
  // toggles
  const [direction, setDirection] = useState<'colorToHangul' | 'hangulToColor'>('hangulToColor');
  const [showKey, setShowKey] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  // set initial client state from server side props
  const [color, setColor] = useState<Color>(colorProp);
  const [nextColor, setNextColor] = useState<Color>(nextColorProp);

  // hit the api for each new color
  const updateColor = async (): Promise<void> => {
    getNewColor(nextColor.hex).then(newColor => {
      setColor(nextColor);
      setNextColor(newColor);
    });
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
