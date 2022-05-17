import {
  ImageSource,
  Loadable,
  Logger,
  Resource,
  SpriteSheet,
  TileMap,
  Vector,
} from 'excalibur';

import {
  Convert,
  LDtkProject,
  LayerInstance,
  TileLayerDefinition,
  TilesetDefinitionWithPath,
} from './ldtk';
import { LDtkLayerComponent } from './LDtkLayerComponent';
import { loadTilesetResource } from './loadTilesetResource';

export class LDtkMapResource implements Loadable<LDtkProject> {
  private _resource: Resource<string>;

  public imageMap: Record<string, ImageSource>;
  public sheetMap: Record<string, SpriteSheet>;

  public data!: LDtkProject;
  logger = Logger.getInstance();

  constructor(public path: string) {
    this._resource = new Resource(path, 'text');
    this.imageMap = {};
    this.sheetMap = {};
  }

  async load() {
    const data = await this._resource.load();
    try {
      this.data = Convert.toLDtk(data);
    } catch (err) {
      throw new Error('Problem');
    }
    await this.loadTilesetImages();
    await this.createTilesetSpriteSheets();
    await this.createTileMap();

    return this.data;
  }

  async loadTilesetImages() {
    await Promise.all(
      this.data.defs.tilesets
        .filter(
          (tileset): tileset is TilesetDefinitionWithPath => !!tileset.relPath
        )
        .map((tileset) => loadTilesetResource(tileset, this.path))
    ).then((imageResources) => {
      this.imageMap = imageResources.reduce((results, { id, resource }) => {
        results[id] = resource;
        return results;
      }, this.imageMap);
    });
  }

  async createTilesetSpriteSheets() {
    for (const tileset of this.data.defs.tilesets) {
      const columns = Math.floor(tileset.pxHei / tileset.cHei);
      const rows = Math.floor(tileset.pxWid / tileset.cWid);
      const spritesheet = SpriteSheet.fromImageSource({
        image: this.imageMap[tileset.uid],
        grid: {
          columns,
          rows,
          spriteHeight: tileset.tileGridSize,
          spriteWidth: tileset.tileGridSize,
        },
      });
      this.sheetMap[tileset.uid] = spritesheet;
    }
  }

  async createTileMap() {
    const layers = this.data.levels.reduce<LayerInstance[]>(
      (results, level) => {
        return [...results, ...(level.layerInstances || [])];
      },
      []
    );

    layers.forEach((layer) => {
      // TODO [#5](https://github.com/airtonix/ecsy-game/issues/5) test for isometric or orthogonal layer types
      this.createOrthogonalTileMapLayer(layer);
    });
  }

  async createOrthogonalTileMapLayer(layer: LayerInstance) {
    const tileMapLayer = new TileMap({
      x: layer.pxOffsetX,
      y: layer.pxOffsetY,
      cellHeight: layer.gridSize,
      cellWidth: layer.gridSize,
      cols: 64,
      rows: 64,
    });
    tileMapLayer.addComponent(new LDtkLayerComponent(layer));
  }

  async createIsoMetricTileMap() {
    throw new Error('ISOMetric layers not supported yet');
  }

  isLoaded(): boolean {
    return !!this.data;
  }

  // private _addTiledCamera(scene: Scene) {
  //   const camera = this.ex.camera;
  //   if (camera) {
  //     scene.camera.x = camera.x;
  //     scene.camera.y = camera.y;
  //     scene.camera.zoom = camera.zoom;
  //   }
  // }

  // private _addTiledColliders(scene: Scene) {
  //   const colliders = this.ex.colliders;
  //   if (colliders) {
  //     for (const collider of colliders) {
  //       const actor = new Actor({
  //         pos: new Vector(collider.x, collider.y),
  //         name: collider.name,
  //         collisionType: collider.collisionType ?? CollisionType.Fixed,
  //       });

  //       if (collider.color) {
  //         actor.color = Color.fromHex(collider.color.value);
  //       }

  //       if (collider.type === 'box') {
  //         actor.collider.useBoxCollider(
  //           collider.width,
  //           collider.height,
  //           Vector.Zero
  //         );
  //       }
  //       if (collider.type === 'circle') {
  //         actor.collider.useCircleCollider(collider.radius);
  //       }
  //       actor.addComponent(new LDtkObjectComponent(collider.tiled));
  //       scene.add(actor);
  //       if (collider.zIndex) {
  //         actor.z = collider.zIndex;
  //       }
  //     }
  //   }
  // }
}
