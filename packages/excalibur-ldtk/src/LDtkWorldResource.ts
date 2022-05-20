import {
  ImageSource,
  Loadable,
  Logger,
  Resource,
  Scene,
  SpriteSheet,
  TileMap,
} from 'excalibur';

import { convertPath } from './convertPath';
import { Convert, LDtkProject, LayerInstance } from './ldtk';
import { LDtkLayerComponent } from './LDtkLayerComponent';
import { LDtkLayerInstance } from './LDtkLayerInstance';
import { LDtkLevel } from './LDtkLevel';

export class LDtkWorldResource implements Loadable<LDtkProject> {
  private _resource: Resource<string>;

  /** ImageSource cache. stored against  */
  imagemaps!: Map<number, ImageSource>;

  /** Spritesheet cache. Stored against the tileset.uid */
  spritesheets!: Map<number, SpriteSheet>;
  levels: Map<string, LDtkLevel>;
  tilemaps!: Map<string, Map<string, TileMap>>;

  data!: LDtkProject;
  logger = Logger.getInstance();

  _loaded = false;

  constructor(public path: string) {
    this._resource = new Resource(path, 'text');
    this.levels = new Map<string, LDtkLevel>();
  }

  isLoaded(): boolean {
    return !!this._loaded;
  }

  /**
   * Async loads the world file and begins constructing all the elements
   * @returns
   */
  async load() {
    const data = await this._resource.load();
    try {
      this.data = Convert.toLDtk(data);
    } catch (err) {
      throw new Error('Problem');
    }

    for (const level of this.data.levels) {
      this.levels.set(level.iid, new LDtkLevel(level));
    }

    this.imagemaps = await this.loadTilesetImages();
    this.spritesheets = await this.createTilesetSpriteSheets(this.imagemaps);
    this.tilemaps = await this.createTileMaps();

    this._loaded = true;
    return this.data;
  }

  addToScene(scene: Scene, levelName: string) {
    const level = this.getLevelByIdentifier(levelName);
    if (!level) throw new Error(`No level by name of ${levelName}`);
    if (!this.tilemaps) throw new Error('Missing tilemaps');
    const tileMapLayers = this.tilemaps.get(level.iid);
    if (tileMapLayers) {
      for (const layer of tileMapLayers.values()) {
        scene.add(layer);
      }
    }
    level.zoomToCameraStart(scene);
  }

  getLevelByIdentifier(name: string) {
    for (const level of this.levels.values()) {
      if (level.identifier === name) return level;
    }
    return;
  }
  /**
   * Scans the world for tileset image references and
   * async loads them
   */
  async loadTilesetImages() {
    const imagemaps = new Map<number, ImageSource>();
    for (const tileset of this.data.defs.tilesets) {
      if (!tileset.relPath) continue;

      const source = tileset.relPath;
      const resource = new ImageSource(convertPath(this.path, source));
      Logger.getInstance().debug(
        '[LDtk] Loading associated tileset: ' + resource.path
      );

      await resource.load();
      imagemaps.set(tileset.uid, resource);
    }
    return imagemaps;
  }

  /**
   * Scans the world for tileset image references and
   * constructs SpriteSheets from the efforts of [this.loadTilesetImages]
   */
  createTilesetSpriteSheets(imagemaps: Map<number, ImageSource>) {
    const spritesheets = new Map();
    for (const tileset of this.data.defs.tilesets) {
      const image = imagemaps.get(tileset.uid);
      if (!image) continue;

      const columns = Math.floor(tileset.pxWid / tileset.tileGridSize);
      const rows = Math.floor(tileset.pxHei / tileset.tileGridSize);
      const spritesheet = SpriteSheet.fromImageSource({
        image,
        grid: {
          columns,
          rows,
          spriteHeight: tileset.tileGridSize,
          spriteWidth: tileset.tileGridSize,
        },
      });
      spritesheets.set(tileset.uid, spritesheet);
    }
    return spritesheets;
  }

  createTileMaps() {
    const tilemaps = new Map<string, Map<string, TileMap>>();
    for (const level of this.levels.values()) {
      const leveltilemaps = new Map<string, TileMap>();
      const layers = level.getLayersByTypes('IntGrid', 'Tiles');
      for (const layer of layers) {
        leveltilemaps.set(layer.iid, this.createOrthogonalTileMapLayer(layer));
      }
      tilemaps.set(level.iid, leveltilemaps);
    }
    return tilemaps;
  }

  /**
   * Creates a tilemap from a layer
   * @param layer
   * @returns
   */
  createOrthogonalTileMapLayer(layer: LDtkLayerInstance) {
    Logger.getInstance().info(
      `Creating Tilemap for level: ${layer.levelID} 👉 ${layer.identifier} [${layer.iid}]`
    );
    const level = this.levels.get(layer.levelID.toString());
    if (!level) {
      throw new Error(
        `Layer [${layer.identifier}] is missing a reference to an existing level ${layer.levelID}`
      );
    }

    const tilemap = new TileMap({
      x: layer.pxTotalOffsetX,
      y: layer.pxTotalOffsetY,
      cellHeight: layer.gridSize,
      cellWidth: layer.gridSize,
      cols: Math.floor(level?.pxWid / layer.gridSize),
      rows: Math.floor(level?.pxHei / layer.gridSize),
    });
    tilemap.addComponent(new LDtkLayerComponent(layer));
    if (layer.autoLayerTiles) {
      this.createAutoTile(layer, tilemap);
    }
    return tilemap;
  }
  createAutoTile(layer: LDtkLayerInstance, tilemap: TileMap) {
    const tiles = layer.autoLayerTiles;
    const tilesetUid = layer.overrideTilesetUid || layer.tilesetDefUid;
    if (!tilesetUid) {
      Logger.getInstance().warn(
        `layer ${layer.identifier} [${layer.iid}] has not defined a tileset`
      );
      return;
    }

    const spritesheet = this.spritesheets.get(tilesetUid);
    if (!spritesheet) return;

    for (const tile of tiles) {
      Logger.getInstance().info(
        `Creating AutoLayerTile for ${layer.identifier}:${tile.t}`
      );
      const sprite = spritesheet.sprites[tile.t];
      if (!sprite) {
        Logger.getInstance().warn(
          `AutoLayerTile for ${layer.identifier}:${tile.t} can't be found in tileset: ${tilesetUid}`
        );
        continue;
      }
      const [tileX, tileY] = tile.px;
      const tileMapTile = tilemap.getCell(tileX, tileY);
      if (!tileMapTile) continue;

      tileMapTile.addGraphic(sprite);
    }
  }

  /**
   * Create an isometric tilemap layer
   *
   * TODO: #6 find data in LDtk that supports isometric tilemaps
   */
  async createIsoMetricTileMap() {
    throw new Error('ISOMetric layers not supported yet');
  }
}
