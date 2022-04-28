export class Canvas {
  canvasWidth: number;
  canvasHeight: number;

  ctx: CanvasRenderingContext2D;

  constructor(public canvas = document.querySelector('canvas')) {
    if (!canvas) throw new Error('Missing canvas element');

    this.canvasWidth = canvas.width = window.innerWidth;
    this.canvasHeight = canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Missing CanvasRenderingContext2D');
    this.ctx = ctx;

    window.addEventListener('resize', this.onResize.bind(this), false);
  }

  destroy() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize() {
    if (!this.canvas) return;

    this.canvasWidth = this.canvas.width = window.innerWidth;
    this.canvasHeight = this.canvas.height = window.innerHeight;
  }
}

export const canvas = new Canvas();
