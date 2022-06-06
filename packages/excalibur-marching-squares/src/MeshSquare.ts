import { ControlNode } from './ControlNode';
import { MeshNode } from './MeshNode';

export class MeshSquare {
  public centerTop: MeshNode;
  public centerRight: MeshNode;
  public centerBottom: MeshNode;
  public centerLeft: MeshNode;

  public configuration = 0;

  constructor(
    public topLeft: ControlNode,
    public topRight: ControlNode,
    public bottomRight: ControlNode,
    public bottomLeft: ControlNode
  ) {
    this.centerTop = topLeft.right;
    this.centerRight = bottomRight.above;
    this.centerBottom = bottomLeft.right;
    this.centerLeft = bottomLeft.above;

    if (topLeft.active) {
      this.configuration += 8;
    }
    if (topRight.active) {
      this.configuration += 4;
    }
    if (bottomRight.active) {
      this.configuration += 2;
    }
    if (bottomLeft.active) {
      this.configuration += 1;
    }
  }
}
