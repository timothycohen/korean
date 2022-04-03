import { useState } from 'react';
import { fade } from 'styles/transitions';
import { ColorMap } from 'lib/color';
import { KoreanContainer as KoreanContainerStyled } from 'lib/components/styled';
import useUpdate from 'lib/hooks/useUpdate';

export default function KoreanContainer({
  showAnswer,
  color,
  children,
}: {
  showAnswer: boolean;
  color: ColorMap;
  children?: React.ReactNode;
}): JSX.Element | null {
  // prevent it lifting on first page load
  const [animationStatus, setAnimationStatus] = useState(false);
  useUpdate((): void => {
    setAnimationStatus(true);
  }, []);

  if (!showAnswer) return null;

  return (
    <KoreanContainerStyled
      className={`${fade.fade} ${animationStatus ? fade.fadeDownAndIn : undefined}`}
      color={color}
    >
      <h1 lang="ko">{color.Korean}</h1>
      {children}
    </KoreanContainerStyled>
  );
}
