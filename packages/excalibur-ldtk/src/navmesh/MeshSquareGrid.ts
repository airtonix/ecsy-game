import { Vector } from 'excalibur';

import { MeshSquare } from './MeshSquare';
import { ControlNode } from './ControlNode';

export class MeshSquareGrid {
  public squares!: MeshSquare[][];
  constructor(public map: number[][], public squareSize: number) {
    const rowCount = map.length;
    const colCount = map[0].length;

    const controlNodes: ControlNode[][] = [];
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      const row: ControlNode[] = [];
      const tileRow = map[rowIndex];

      for (let colIndex = 0; colIndex < colCount; colIndex++) {
        row.push(
          new ControlNode(
            new Vector(
              colIndex * squareSize + squareSize / 2,
              rowIndex * squareSize + squareSize / 2
            ),
            tileRow[colIndex] === 1,
            squareSize
          )
        );
      }
      controlNodes.push(row);
    }

    const squares: MeshSquare[][] = [];
    for (let rowIndex = 0; rowIndex < rowCount - 1; rowIndex++) {
      const row: MeshSquare[] = [];
      for (let colIndex = 0; colIndex < colCount - 1; colIndex++) {
        const topLeft = controlNodes[rowIndex][colIndex + 1];
        const topRight = controlNodes[rowIndex + 1][colIndex + 1];
        const bottomRight = controlNodes[rowIndex + 1][colIndex];
        const bottomLeft = controlNodes[rowIndex][colIndex];
        row.push(new MeshSquare(topLeft, topRight, bottomRight, bottomLeft));
      }
      squares.push(row);
    }
    this.squares = squares;
  }
}
