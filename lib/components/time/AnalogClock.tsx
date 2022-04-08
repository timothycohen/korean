import styled from '@emotion/styled';

type StyledProps = {
  deg: number;
  calcTransform: (deg: number) => string;
};

// the width starts where its center should be. push everything over by 50% width per axis
const calcTop = (deg: number, width: number): string =>
  `calc(50% - calc(${width / 2}% * ${Math.cos(rad(deg))}))`;

const calcLeft = (deg: number, width: number): string =>
  `calc(50% + calc(${width / 2}% * ${Math.sin(rad(deg))}))`;

const MinuteMark = styled('div')(({ theme, deg, calcTransform }: StyledProps) => ({
  position: 'absolute',
  top: calcTop(deg, 0.85),
  left: calcLeft(deg, 0.85),
  width: `.85%`,
  height: `4%`,
  background: `linear-gradient(0deg, ${theme.palette.primary.main} 70%, transparent 70%)`,
  transformOrigin: 'top left',
  transform: calcTransform(deg),
  zIndex: 1,
}));

const HourMark = styled('div')(({ theme, deg, calcTransform }: StyledProps) => ({
  position: 'absolute',
  top: calcTop(deg, 2),
  left: calcLeft(deg, 2),
  width: `2%`,
  height: `7%`,
  backgroundColor: theme.palette.primary.main,
  background: `linear-gradient(0deg, ${theme.palette.primary.main} 80%, transparent 80%)`,
  transformOrigin: 'top left',
  transform: calcTransform(deg),
  zIndex: 2,
}));

const MinuteHand = styled('div')(({ theme, deg, calcTransform }: StyledProps) => ({
  position: 'absolute',
  top: calcTop(deg, 1.5),
  left: calcLeft(deg, 1.5),
  width: `1.5%`,
  height: `100%`,
  backgroundColor: theme.palette.primary.main,
  background: `linear-gradient(transparent 40%, ${theme.palette.primary.main} 40%, ${theme.palette.primary.main} 90%, transparent 90%)`,
  transformOrigin: 'top left',
  transform: calcTransform(deg),
  zIndex: 3,
}));

const HourHand = styled('div')(({ theme, deg, calcTransform }: StyledProps) => ({
  position: 'absolute',
  top: calcTop(deg, 2.5),
  left: calcLeft(deg, 2.5),
  width: `2.5%`,
  height: `90%`,
  backgroundColor: theme.palette.primary.main,
  background: `linear-gradient(transparent 45%, ${theme.palette.primary.main} 45%, ${theme.palette.primary.main} 90%, transparent 90%)`,
  transformOrigin: 'top left',
  transform: calcTransform(deg),
  zIndex: 4,
}));

const Circle = styled('div')(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  borderRadius: '100%',
  border: `3px solid ${theme.palette.primary.main}`,
  zIndex: 5,
}));

const rad = (deg: number): number => (deg * Math.PI) / 180;

export default function Clock({
  size = '500',
  hour,
  minute,
}: {
  size?: string;
  hour: number;
  minute: number;
}): JSX.Element | null {
  const getTransformX = (deg: number): number => (parseInt(size) / 2) * Math.cos(rad(deg));
  const getTransformY = (deg: number): number => (parseInt(size) / 2) * Math.sin(rad(deg));
  const calcTransform = (deg: number): string =>
    `translate(${getTransformX(deg)}px, ${getTransformY(deg)}px) rotate(${90 + deg}deg)`;

  const minDeg = 90 + (minute * 360) / 60;
  const hourDeg = 90 + (hour * 360) / 12 + ((Number.isNaN(minute) ? 0 : minute) * 360) / 12 / 60;

  return (
    <div style={{ position: 'relative', height: `${size}px`, width: `${size}px` }}>
      <Circle />
      {[...Array(60)]
        .map((_, i): number => i * 6)
        .map((deg): JSX.Element => {
          if (deg % 30 === 0) return <HourMark key={deg} deg={deg} calcTransform={calcTransform} />;
          return <MinuteMark key={deg} deg={deg} calcTransform={calcTransform} />;
        })}
      <HourHand deg={hourDeg} calcTransform={calcTransform} />
      <MinuteHand deg={minDeg} calcTransform={calcTransform} />
    </div>
  );
}
