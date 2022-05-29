import { Color, Scene } from 'excalibur';

import { ColliderMesh } from './ColliderMesh';
import { renderMeshNode } from './renderMeshNode';

export function meshRenderer(mesh: ColliderMesh, scene: Scene) {
  mesh.sqaureGrid.squares.forEach((row) => {
    row.forEach((cell) => {
      scene.add(renderMeshNode(cell.topLeft.position, cell.topLeft.active));

      scene.add(renderMeshNode(cell.topRight.position, cell.topRight.active));
      scene.add(
        renderMeshNode(cell.bottomRight.position, cell.bottomRight.active)
      );
      scene.add(
        renderMeshNode(cell.bottomLeft.position, cell.bottomLeft.active)
      );
    });
  });
}
