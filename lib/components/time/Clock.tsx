import AnalogClock from './AnalogClock';
import DigitalClock from './DigitalClock';
import styled from '@emotion/styled';
import { useState } from 'react';

const UnstyledButton = styled('button')({
  outline: 'none',
  border: 'none',
  backgroundColor: 'transparent',
});

export default function Clock({ hr, min }: { hr: string; min: string }): JSX.Element {
  const [view, setView] = useState<'digital' | 'analog'>('digital');

  return (
    <UnstyledButton type="button" onClick={() => setView(view === 'digital' ? 'analog' : 'digital')}>
      {view === 'analog' ? (
        <AnalogClock size="400" hour={parseInt(hr)} minute={parseInt(min)} />
      ) : (
        <DigitalClock size="400" hour={hr} minute={min} />
      )}
    </UnstyledButton>
  );
}
