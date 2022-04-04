import Pullover from './Pullover';
import Skirt from './Skirt';

// others
// https://freesvg.org/vector-line-art-drawing-of-a-simple-shirt
// https://freesvg.org/coloured-line-art-vector-image-of-trousers

export default function Clothing() {
  const colors = [0, 60, 120, 180, 240, 300];

  return (
    <>
      {colors.map(c => (
        <Skirt key={`skirt-${c}`} color={`hsl(${c}, 100%, 50%)`} />
      ))}
      {colors.map(c => (
        <Pullover key={`pullover-${c}`} color={`hsl(${c}, 100%, 50%)`} />
      ))}
    </>
  );
}
