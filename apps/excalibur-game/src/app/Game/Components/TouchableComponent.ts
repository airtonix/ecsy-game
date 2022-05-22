import { Component, Entity } from 'excalibur';

type TouchableComponentType = 'game.touchable';
export class TouchableComponent extends Component<TouchableComponentType> {
  readonly type = 'game.touchable';
  public touchedBy!: Map<string, Entity>;
  public touching!: Map<string, Entity>;
}
