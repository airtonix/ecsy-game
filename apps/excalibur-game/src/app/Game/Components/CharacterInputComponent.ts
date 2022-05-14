import { Component } from 'excalibur';

export class CharacterInputComponent extends Component<'game.movement.controlled'> {
  readonly type = 'game.movement.controlled';
  constructor(public speed = 48) {
    super();
  }
}
