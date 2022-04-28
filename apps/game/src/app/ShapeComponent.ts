import { ComponentData, string } from 'ecstra';

export class Shape extends ComponentData {
  @string()
  primitive = 'box';
}
