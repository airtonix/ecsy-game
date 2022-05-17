import {
  ImageSource,
  Loadable,
  Logger,
  Resource,
  SpriteSheet,
  TileMap,
} from 'excalibur';

import { convertPath } from './convertPath';
import { Convert, LDtkProject, LayerInstance } from './ldtk';
import { LDtkLayerComponent } from './LDtkLayerComponent';

export class LDtkWorldResource implements Loadable<LDtkProject> {
  private _resource: Resource<string>;

  /** ImageSource cache. stored against  */
  public imageMap: Record<string, ImageSource> = {};

  /** Tilemap cache. Stored against the levelid-layerid */
  public tileMap: Record<string, TileMap> = {};

  /** Spritesheet cache. Stored against the tileset.uid */
  public sheetMap: Record<string, SpriteSheet> = {};

  public data!: LDtkProject;
  logger = Logger.getInstance();

  constructor(public path: string) {
    this._resource = new Resource(path, 'text');
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
    await this.loadTilesetImages();
    await this.createTilesetSpriteSheets();
    await this.createTileMaps();

    return this.data;
  }

  /**
   * Scans the world for tileset image references and
   * async loads them
   */
  async loadTilesetImages() {
    for (const tileset of this.data.defs.tilesets) {
      if (!tileset.relPath) continue;
      const source = tileset.relPath;
      const resource = new ImageSource(convertPath(this.path, source));
      Logger.getInstance().debug(
        '[LDtk] Loading associated tileset: ' + resource.path
      );

      await resource.load();
      this.imageMap[tileset.uid] = resource;
    }
  }

  /**
   * Scans the world for tileset image references and
   * constructs SpriteSheets from the efforts of [this.loadTilesetImages]
   */
  createTilesetSpriteSheets() {
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

  /**
   * Start constructing the tilemap for each levels layer
   */
  async createTileMaps() {
    const layers = this.data.levels.reduce<LayerInstance[]>(
      (results, level) => {
        return [...results, ...(level.layerInstances || [])];
      },
      []
    );

    layers.forEach(async (layer) => {
      this.createOrthogonalTileMapLayer(layer);
      if (layer.autoLayerTiles)
        this.createOrthogonalAutoLayerTiles(
          `${layer.levelID}-${layer.iid}`,
          layer.autoLayerTiles
        );
    });
  }

  /**
   * Creates a tilemap from a layer
   * @param layer
   * @returns
   */
  createOrthogonalTileMapLayer(layer: LayerInstance) {
    const tilemap = new TileMap({
      x: layer.pxOffsetX,
      y: layer.pxOffsetY,
      cellHeight: layer.gridSize,
      cellWidth: layer.gridSize,
      cols: 64,
      rows: 64,
    });
    tilemap.addComponent(new LDtkLayerComponent(layer));
    this.tileMap[`${layer.levelID}-${layer.iid}`] = tilemap;
  }

  createOrthogonalAutoLayerTiles(
    tilemapKey: string,
    tiles: LayerInstance['gridTiles']
  ) {
    const tilemap = this.tileMap[tilemapKey];
    for (const tile of tiles) {
      Logger.getInstance().info(
        `Creating AutoLayerTile for ${tilemapKey}:${tile.t}`
      );
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

  isLoaded(): boolean {
    return !!this.data;
  }
}
