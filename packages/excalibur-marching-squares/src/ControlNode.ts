import { Vector } from 'excalibur';

import { MeshNode } from './MeshNode';

export class ControlNode extends MeshNode {
  public above!: MeshNode;
  public right!: MeshNode;
  constructor(
    public position: Vector,
    public active: boolean,
    public squareSize: number
  ) {
    super(position);
    this.above = new MeshNode(
      position
        .clone()
        .add(Vector.Down)
        .scale(squareSize / 2)
    );
    this.right = new MeshNode(
      position
        .clone()
        .add(Vector.Right)
        .scale(squareSize / 2)
    );
  }
}
