import React, { useRef } from 'react';

import styles from './App.module.css';
import { useGame } from './Core/Game';

export const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { game } = useGame({ canvas: canvasRef.current });

  return (
    <section className={styles.block}>
      <canvas ref={canvasRef}></canvas>
      {!game ? 'loading' : game?.stats.prevFrame.fps}
    </section>
  );
};
