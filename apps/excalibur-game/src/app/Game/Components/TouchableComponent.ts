import { Component, Entity } from 'excalibur';

type TouchableComponentType = 'game.touchable';
export class TouchableComponent extends Component<TouchableComponentType> {
  readonly type = 'game.touchable';
  public touchedBy = new Map<string, Entity>();
  public touching = new Map<string, Entity>();
}
