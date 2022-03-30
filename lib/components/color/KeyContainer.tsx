import { Color } from '../../../lib/color';
import styled from '@mui/system/styled';
import { CSSTransition } from 'react-transition-group';
import { fadeUp } from '../../../styles/transitions';
import { BlackContainer } from '../styled';

const KeyContainerStyled = styled(BlackContainer)({
  width: '90%',
  top: '50%',
  left: 'calc(50% - calc(90% / 2))',

  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
  padding: '1rem',
  fontSize: '2rem',
  backgroundColor: 'black',
  justifyContent: 'center',
});

const KeyItemStyled = styled('span')<{ color: string; bg: string }>(({ bg, color }) => ({
  color: color,
  fontFamily: 'GowunDodum',
  backgroundColor: bg,
  borderRadius: '3px',
  fontWeight: '700',
}));

export default function KeyContainer({ showKey }: { showKey: boolean }): JSX.Element {
  return (
    <CSSTransition in={showKey} timeout={300} classNames={fadeUp}>
      <KeyContainerStyled>
        {Color.all.map(c => {
          let bg = 'transparent';
          if (c.English === 'black' || c.Korean === '남색' || c.Korean === '보라색') {
            bg = 'white';
          }
          return (
            <KeyItemStyled
              color={c.hex}
              bg={bg}
              key={c.hex}
              tabIndex={showKey ? 0 : -1}
              role="img"
              lang="ko"
              aria-label={`${c.English} is ${c.Korean}`}
            >
              <span lang="ko">{c.Korean}</span>
            </KeyItemStyled>
          );
        })}
      </KeyContainerStyled>
    </CSSTransition>
  );
}
