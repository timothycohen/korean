import styled from '@mui/system/styled';
import { Color } from 'lib/color';
import { VisibilitySwitch } from 'lib/components/styled';
import { SelectionContainer } from 'lib/components/color';
import { KoreanContainer } from 'lib/components/styled';

const Page = styled('main')<{ bg: string }>({
  height: '100%',
  minHeight: '100vh',
  backgroundColor: 'black',
});

export default function HangulToColor({
  showKey,
  setShowKey,
  color,
  updateColor,
}: {
  showKey: boolean;
  setShowKey: React.Dispatch<React.SetStateAction<boolean>>;
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
    <Page bg={color.hex}>
      <KoreanContainer>
        <h1 lang="ko">{color.Korean}</h1>
        <VisibilitySwitch label="Key" ariaLabel="Show Key" showFlag={showKey} setShowFlag={setShowKey} />
      </KoreanContainer>
      <SelectionContainer showKey={showKey} onClick={handleClick} />
    </Page>
  );
}
