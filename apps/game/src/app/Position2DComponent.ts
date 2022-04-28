import { ComponentData, number } from 'ecstra';

export class Position2D extends ComponentData {
  @number()
  x!: number;

  @number()
  y!: number;
}
