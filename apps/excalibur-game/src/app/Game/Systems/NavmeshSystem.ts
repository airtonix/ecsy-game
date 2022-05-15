import { TiledObjectGroup } from '@excaliburjs/plugin-tiled';
import {
  Actor,
  Circle,
  Color,
  Entity,
  Polygon,
  Scene,
  System,
  SystemType,
  TagComponent,
  Vector,
  vec,
} from 'excalibur';
import { NavMesh, Point, PolyPoints } from 'navmesh/src';

export class NavMeshTag extends TagComponent<'game.navmesh'> {
  constructor() {
    super('game.navmesh');
  }
}

export class NavMeshSystem extends System<NavMeshTag> {
  systemType = SystemType.Update;
  types = ['game.navmesh'] as const;
  meshes: Record<string, ExcaliburNavMesh> = {};
  constructor(public scene: Scene) {
    super();
  }

  update(entities: Entity[], delta: number): void {
    return;
  }

  buildMeshFromTiled(
    key: string,
    objectLayer: TiledObjectGroup,
    meshShrinkAmount = 0
  ) {
    if (this.meshes[key]) {
      return this.meshes[key];
    }

    const objects = objectLayer.getObjectsByType('navmesh') ?? [];
    const polygons = objects.map((object) => {
      const h = object.height ?? 0;
      const w = object.width ?? 0;
      const left = object.x ?? 0;
      const top = object.y ?? 0;
      const bottom = top + h;
      const right = left + w;
      return [
        { x: left, y: top },
        { x: left, y: bottom },
        { x: right, y: bottom },
        { x: right, y: top },
      ];
    });
    const mesh = new ExcaliburNavMesh(
      this,
      this.scene,
      key,
      polygons,
      meshShrinkAmount
    );

    this.meshes[key] = mesh;
    return mesh;
  }

  /**
   * Remove the navmesh stored under the given key from the plugin. This does not destroy the
   * navmesh.
   * @param key
   */
  public removeMesh(key: string) {
    if (this.meshes[key]) delete this.meshes[key];
  }
}

class ExcaliburNavMesh extends Actor {
  public mesh: NavMesh;

  constructor(
    public system: NavMeshSystem,
    public scene: Scene,
    public key: string,
    points: PolyPoints[],
    shrink = 0
  ) {
    super();
    this.mesh = new NavMesh(points, shrink);
  }

  public isPointInMesh(point: Point) {
    return this.mesh.isPointInMesh(point);
  }

  /**
   * See {@link NavMesh#findPath}. This implements the same functionality, except that the returned
   * path is converted to Phaser-compatible points.
   * @param startPoint A point-like object
   * @param endPoint A point-like object
   * @param PointClass The class used to represent points in the final path
   * @returns An array of points if a path is found, or null if no path
   */
  public findPath(startPoint: Point, endPoint: Point, PointClass = Vector) {
    const path = this.mesh.findPath(startPoint, endPoint);
    return path ? path.map(({ x, y }) => new PointClass(x, y)) : path;
  }

  /**
   * Visualize a path (array of points) on the debug graphics.
   * @param path Array of point-like objects in the form {x, y}
   * @param color
   * @param thickness
   * @param alpha
   */
  public debugDrawPath(path: Point[], color = Color.Green, thickness = 10) {
    // if (!this.debugGraphics) return;

    // if (path && path.length) {
    //   // Draw line for path
    //   this.debugGraphics.members.push({
    //     graphic: new Polygon({
    //       strokeColor: color,
    //       lineWidth: thickness,
    //       points: path.map((point) => vec(point.x, point.y)),
    //     }),
    //     pos: vec(path[0].x, path[0].y),
    //   });

    //   // Draw circle at start and end of path
    //   this.debugGraphics.members.push({
    //     graphic: new Circle({
    //       strokeColor: color,
    //       radius: 1.2 * thickness,
    //     }),
    //     pos: vec(path[0].x, path[0].y),
    //   });

    //   if (path.length > 1) {
    //     const lastPoint = path[path.length - 1];
    //     this.debugGraphics.members.push({
    //       graphic: new Circle({
    //         strokeColor: color,
    //         radius: 1.2 * thickness,
    //       }),
    //       pos: vec(lastPoint.x, lastPoint.y),
    //     });
    //   }
    // }
    return;
  }
}
