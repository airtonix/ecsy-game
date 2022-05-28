import {
  ImageSource,
  Loadable,
  Logger,
  Resource,
  SpriteSheet,
} from 'excalibur';

import { convertPath } from './convertPath';
import { Convert, LDtkProject } from './ldtk';
import { LDtkLevel } from './LDtkLevel';

export class LDtkWorldResource implements Loadable<LDtkProject> {
  private _resource: Resource<string>;

  id!: string;

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

  getLevelIIDFromName(name: string) {
    for (const level of this.levels.values()) {
      if (level.identifier === name) return level.iid;
    }
    throw new Error(`No Level IID for ${name}`);
  }

  getLevelByIdentifier(name: string) {
    for (const level of this.levels.values()) {
      if (level.identifier === name) return level;
    }
    return;
  }

  getLevelByUid(uid: number) {
    for (const level of this.levels.values()) {
      if (level.uid === uid) return level;
    }
    return;
  }

  getLevelByIID(iid: string) {
    return this.levels.get(iid);
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
