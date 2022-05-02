import { Loader, Scene } from 'excalibur';
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

import { useWindowSize } from '../useWindowSize';

import { Game, createGame, resetCamera } from './Game';

type UseGameProps = {
  canvas: ConstructorParameters<typeof Game>[0] | null;
  loader: Loader;
  init?: (game: Game) => Promise<void>;
  onBoot: (game: Game) => void;
  onError?: (reason: any) => Promise<void>;
};
export const useGame = ({
  canvas,
  loader,
  init,
  onBoot,
  onError,
}: UseGameProps) => {
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
    const game = createGame({ canvas });

    gameReference.current = game;
    if (typeof init === 'function') {
      init(game).then(() => {
        game.start(loader).then(() => {
          onBoot(game);
        }, onError);
      });
    } else {
      game.start(loader).then(() => {
        onBoot(game);
      }, onError);
    }
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
