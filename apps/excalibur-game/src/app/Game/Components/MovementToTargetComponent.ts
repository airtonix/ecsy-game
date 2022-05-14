import { Component, Vector } from 'excalibur';

export class MovementToTargetComponent extends Component<'game.movement.totarget'> {
  readonly type = 'game.movement.totarget';

  public target?: Vector;
  constructor(public speed: number = 0) {
    super();
  }
}
