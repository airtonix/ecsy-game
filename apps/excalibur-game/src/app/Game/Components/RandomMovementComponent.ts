import { Component, Vector } from 'excalibur';

export class RandomMovementComponent extends Component<'game.movement.random'> {
  readonly type = 'game.movement.random';

  public destination?: Vector;
  public cooldown!: number;
  constructor(public speed: number = 0) {
    super();
  }
}
