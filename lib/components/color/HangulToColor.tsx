import styled from '@mui/system/styled';
import { Color } from 'lib/color';
import { SelectionContainer } from 'lib/components/color';
import { KoreanContainer as KoreanContainerStyled, VisibilitySwitch } from 'lib/components/styled';

const Page = styled('main')(({ bg }: { bg: string }) => ({
  height: '100%',
  minHeight: '100vh',
  backgroundColor: bg,
}));

const Container = styled('div')({
  display: 'grid',
  placeContent: 'center',
});

export default function HangulToColor({
  showKey,
  setShowKey,
  showAnswer,
  setShowAnswer,
  color,
  updateColor,
}: {
  showKey: boolean;
  setShowKey: React.Dispatch<React.SetStateAction<boolean>>;
  showAnswer: boolean;
  setShowAnswer: React.Dispatch<React.SetStateAction<boolean>>;
  color: Color;
  updateColor: () => void;
}): JSX.Element | null {
  const handleClick = (hex: string): boolean => {
    if (hex === color.hex) {
      updateColor();
      return true;
    } else {
      return false;
    }
  };

  return (
    <Page bg={showAnswer ? color.hex : 'black'}>
      <KoreanContainerStyled color={showAnswer ? color : undefined}>
        <h1 lang="ko">{color.Korean}</h1>
        <Container>
          <VisibilitySwitch label="Key" ariaLabel="Show Key" showFlag={showKey} setShowFlag={setShowKey} />
          <VisibilitySwitch
            label="Answer"
            ariaLabel="Show Answer"
            showFlag={showAnswer}
            setShowFlag={setShowAnswer}
          />
        </Container>
      </KoreanContainerStyled>

      <SelectionContainer showKey={showKey} onClick={handleClick} />
    </Page>
  );
}
