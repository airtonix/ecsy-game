import React, { useRef } from 'react';

import styles from './App.module.css';
import { useGame } from './Core/Game';
import { Loader } from './Game/Resources';
import { init, onBoot } from './Game';
export const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { game } = useGame({
    canvas: canvasRef.current,
    loader: Loader,
    onBoot,
    init,
    async onError(reason) {
      console.error(reason);
    },
  });

  return (
    <section className={styles.block}>
      <canvas ref={canvasRef}></canvas>
      {!game ? 'loading' : game?.stats.prevFrame.fps}
    </section>
  );
};
