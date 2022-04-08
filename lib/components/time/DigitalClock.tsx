import styled from '@emotion/styled';

const DigitalClockStyled = styled('div')(({ theme, size }) => ({
  display: 'grid',
  placeItems: 'center',
  height: `${size}px`,
  width: `${size}px`,
  fontFamily: 'Digital',
  color: theme.palette.primary.main,
  fontSize: size / 5,
}));

export default function DigitalClock({
  size = '500',
  hour,
  minute,
}: {
  size?: string;
  hour: string;
  minute: string;
}): JSX.Element | null {
  const hr = hour === '' ? '--' : hour.length === 1 ? `0${hour}` : hour;
  const min = minute === '' ? '--' : minute.length === 1 ? `0${minute}` : minute;

  return (
    <DigitalClockStyled size={size}>
      {hr}:{min}
    </DigitalClockStyled>
  );
}
