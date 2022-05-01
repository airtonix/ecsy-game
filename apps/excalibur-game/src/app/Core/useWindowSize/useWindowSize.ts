import { useCallback, useEffect, useState } from 'react';

export type WindowSize = {
  width?: number;
  height?: number;
};

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSize>();

  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { windowSize };
}
