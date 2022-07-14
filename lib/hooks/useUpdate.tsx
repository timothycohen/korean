import { useEffect, useRef } from 'react';

const useUpdate = (func: () => void, deps: any[]) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [func, ...deps]);
};

export default useUpdate;
