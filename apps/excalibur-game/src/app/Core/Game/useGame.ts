import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

import { useWindowSize } from '../useWindowSize';

import { Game, createGame, resetCamera } from './Game';

type UseGameProps = {
  canvas: ConstructorParameters<typeof Game>[0] | null;
};
export const useGame = ({ canvas }: UseGameProps) => {
  const windowSize = useWindowSize();
  const gameReference = useRef<Game>();

  const updateState = useCallback(() => {
    const game = gameReference.current;
    if (!game) return;
  }, [gameReference]);

  useEffect(() => {
    const interval = setInterval(updateState, 100);
    return () => clearInterval(interval);
  }, [gameReference]);

  useEffect(() => {
    if (!canvas) return;
    const game: Game = createGame({ canvas });

    gameReference.current = game;
    game.start();
  }, [canvas]);

  useLayoutEffect(() => {
    const game = gameReference.current;
    if (!game) return;

    resetCamera(game);
    return () => {
      return;
    };
  }, []);

  const game = gameReference.current;

  return {
    game,
  };
};
