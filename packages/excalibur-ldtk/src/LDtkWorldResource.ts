import {
  Entity,
  ImageSource,
  Loadable,
  Logger,
  Resource,
  Scene,
  SpriteSheet,
} from 'excalibur';

import { convertPath } from './convertPath';
import { Convert, LDtkProject } from './ldtk';
import { LDtkEntity } from './LDtkEntity';
import { LDtkLevel } from './LDtkLevel';
import { LDtkOrthognalLevelTilemap } from './LDtkOrthognalLevelTilemap';

export class LDtkWorldResource implements Loadable<LDtkProject> {
  private _resource: Resource<string>;

  /** ImageSource cache. stored against  */
  imagemaps!: Map<number, ImageSource>;

  /** Spritesheet cache. Stored against the tileset.uid */
  spritesheets!: Map<number, SpriteSheet>;
  levels: Map<string, LDtkLevel>;

  data!: LDtkProject;

  private _loaded = false;

  constructor(public path: string) {
    this._resource = new Resource(path, 'text');
    this.levels = new Map<string, LDtkLevel>();
  }

  isLoaded(): boolean {
    return !!this._loaded;
  }

  /**
   * Async loads the world file and begins constructing all the elements
   */
  async load() {
    const data = await this._resource.load();
    try {
      this.data = Convert.toLDtk(data);
    } catch (err) {
      throw new Error(`Problem: ${err instanceof Error ? err.message : ''}`);
    }

    for (const level of this.data.levels) {
      this.levels.set(level.iid, new LDtkLevel(level));
    }
    Logger.getInstance().info(`Loaded [${this.levels.size}] levels.`);

    this.imagemaps = await this.loadTilesetImages();
    Logger.getInstance().info(`Created [${this.imagemaps.size}] imagemaps.`);

    this.spritesheets = await this.createTilesetSpriteSheets(this.imagemaps);
    Logger.getInstance().info(
      `Created [${this.spritesheets.size}] spritesheets.`
    );

    this._loaded = true;
    return this.data;
  }

  addToScene(scene: Scene, levelName: string) {
    const level = this.getLevelByIdentifier(levelName);
    if (!level) throw new Error(`No level by name of ${levelName}`);
    LDtkOrthognalLevelTilemap.create(level, this.spritesheets).addToScene(
      scene
    );

    level.zoomToCameraStart(scene);
  }

  generateEntities(
    levelName: string,
    entityMap: Record<string, (entity: LDtkEntity) => void>
  ) {
    const level = this.getLevelByIdentifier(levelName);
    if (!level) throw new Error(`No level by name of ${levelName}`);

    for (const layer of level.getEntityLayers()) {
      for (const entityId in layer.entities) {
        const entity = layer.entities[entityId];
        const entityFactory = entityMap[entity.identifier] || entityMap.default;
        if (!entityFactory) {
          Logger.getInstance().warn(
            `Provided entityMap does not have an entry for ${entity.identifier}`
          );
          continue;
        }
        try {
          entityFactory(entity);
        } catch (error) {
          Logger.getInstance().error(
            `Problem creating Entity from provided entityMap for ${entity.identifier}`
          );
        }
      }
    }
    return this;
  }

  getLevelByIdentifier(name: string) {
    for (const level of this.levels.values()) {
      if (level.identifier === name) return level;
    }
    return;
  }

  getLevelByUid(uid: number) {
    return Array.from(this.levels.values()).find((level) => level.uid === uid);
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
}
