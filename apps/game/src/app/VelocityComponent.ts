import { ComponentData, number } from 'ecstra';

export class Velocity extends ComponentData {
  @number()
  x!: number;

  @number()
  y!: number;
}
