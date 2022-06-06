import { Vector } from 'excalibur';

import { MeshNode } from './MeshNode';
import { MeshSquare } from './MeshSquare';
import { MeshSquareGrid } from './MeshSquareGrid';

export class ColliderMesh {
  public sqaureGrid: MeshSquareGrid;
  public vertices: Vector[] = [];
  public triangles: number[] = [];

  constructor(public map: number[][], public squareSize: number) {
    this.sqaureGrid = new MeshSquareGrid(map, squareSize);

    for (
      let rowIndex = 0;
      rowIndex < this.sqaureGrid.squares.length - 1;
      rowIndex++
    ) {
      const squareRow = this.sqaureGrid.squares[rowIndex];
      for (let colIndex = 0; colIndex < squareRow.length - 1; colIndex++) {
        this.triangulateSquare(this.sqaureGrid.squares[rowIndex][colIndex]);
      }
      //https://youtu.be/2gIxh8CX3Hk?t=1103
    }
  }

  triangulateSquare(square: MeshSquare) {
    switch (square.configuration) {
      // No Point
      case 0:
        break;

      // Single Point
      case 1: {
        this.meshFromPoints(
          square.centerBottom,
          square.bottomLeft,
          square.centerLeft
        );
        break;
      }
      case 2: {
        this.meshFromPoints(
          square.centerRight,
          square.bottomRight,
          square.centerBottom
        );
        break;
      }
      case 4: {
        this.meshFromPoints(
          square.centerTop,
          square.topRight,
          square.centerRight
        );
        break;
      }
      case 8: {
        this.meshFromPoints(
          square.topLeft,
          square.centerTop,
          square.centerLeft
        );
        break;
      }

      // Two Points
      case 3: {
        this.meshFromPoints(
          square.centerRight,
          square.bottomRight,
          square.bottomLeft,
          square.centerLeft
        );
        break;
      }
      case 6: {
        this.meshFromPoints(
          square.centerTop,
          square.topRight,
          square.bottomRight,
          square.centerBottom
        );
        break;
      }
      case 9: {
        this.meshFromPoints(
          square.topLeft,
          square.centerTop,
          square.centerBottom,
          square.bottomLeft
        );
        break;
      }
      case 12: {
        this.meshFromPoints(
          square.topLeft,
          square.topRight,
          square.centerRight,
          square.centerLeft
        );
        break;
      }
      // Two point diagonals
      case 5: {
        this.meshFromPoints(
          square.centerTop,
          square.topRight,
          square.centerRight,
          square.centerBottom,
          square.bottomLeft,
          square.centerLeft
        );
        break;
      }
      case 10: {
        this.meshFromPoints(
          square.topLeft,
          square.centerTop,
          square.centerRight,
          square.bottomRight,
          square.centerBottom,
          square.centerLeft
        );
        break;
      }
      // Three Points
      case 7: {
        this.meshFromPoints(
          square.centerTop,
          square.topRight,
          square.bottomRight,
          square.bottomLeft,
          square.centerLeft
        );
        break;
      }
      case 11: {
        this.meshFromPoints(
          square.topLeft,
          square.centerTop,
          square.centerRight,
          square.bottomRight,
          square.bottomLeft
        );
        break;
      }
      case 13: {
        this.meshFromPoints(
          square.topLeft,
          square.topRight,
          square.centerRight,
          square.centerBottom,
          square.bottomLeft
        );
        break;
      }
      case 14: {
        this.meshFromPoints(
          square.topLeft,
          square.topRight,
          square.bottomRight,
          square.centerBottom,
          square.centerLeft
        );
        break;
      }

      //
      case 15: {
        this.meshFromPoints(
          square.topLeft,
          square.topRight,
          square.bottomRight,
          square.bottomLeft
        );
        break;
      }
    }
  }

  meshFromPoints(...points: MeshNode[]) {
    this.assignVertices(points);
    if (points.length >= 3) {
      this.createTriangle(points[0], points[1], points[2]);
    }
    if (points.length >= 4) {
      this.createTriangle(points[0], points[2], points[3]);
    }
    if (points.length >= 5) {
      this.createTriangle(points[0], points[3], points[4]);
    }
    if (points.length >= 6) {
      this.createTriangle(points[0], points[4], points[5]);
    }
  }

  assignVertices(points: MeshNode[]) {
    for (let index = 0; index < points.length; index++) {
      const point = points[index];
      if (point.verticeIndex === -1) {
        point.verticeIndex = this.vertices.length;
        this.vertices.push(point.position);
      }
    }
  }

  createTriangle(a: MeshNode, b: MeshNode, c: MeshNode) {
    this.triangles.push(a.verticeIndex);
    this.triangles.push(b.verticeIndex);
    this.triangles.push(c.verticeIndex);
  }
}
