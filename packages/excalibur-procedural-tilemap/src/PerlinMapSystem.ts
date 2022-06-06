/* eslint-disable no-console */
import {
  AddedEntity,
  Entity,
  Logger,
  RemovedEntity,
  Scene,
  System,
  SystemType,
  TileMap,
  isAddedSystemEntity,
  isRemoveSystemEntity,
  vec,
} from 'excalibur';

import { getPerlinSprite } from './getPerlinSprite';
import {
  PerlinChunkComponent,
  PerlinChunkComponentType,
} from './PerlinChunkComponent';

export class PerlinMapSystem extends System<PerlinChunkComponent, Scene> {
  systemType: SystemType = SystemType.Draw;
  types = [PerlinChunkComponentType] as const;
  tilemaps = new Map<string, TileMap>();
  scene!: Scene;
  log = Logger.getInstance();

  override initialize(scene: Scene) {
    this.scene = scene;
  }

  createChunkMap({ chunk }: PerlinChunkComponent) {
    if (this.tilemaps.has(chunk.id)) return;

    const tilemap = new TileMap({
      name: `${chunk.id}`,
      pos: vec(
        chunk.position.x - (chunk.chunkSize * chunk.tileSize) / 2,
        chunk.position.y - (chunk.chunkSize * chunk.tileSize) / 2
      ),
      columns: chunk.chunkSize,
      rows: chunk.chunkSize,
      tileHeight: chunk.tileSize,
      tileWidth: chunk.tileSize,
    });

    for (const tile of chunk.tiles) {
      const point = vec(
        tile.x / chunk.options.tileSize,
        tile.y / chunk.options.tileSize
      );
      const tileMapTile = tilemap.getTile(point.x, point.y);
      if (tileMapTile) {
        tileMapTile.addGraphic(getPerlinSprite(chunk.tileSize, tile.value));
      }
    }
    tilemap.z = 30;
    this.tilemaps.set(chunk.id, tilemap);
    this.scene.add(tilemap);
  }

  removeChunkMap({ chunk }: PerlinChunkComponent) {
    const tilemap = this.tilemaps.get(chunk.id);
    if (tilemap) {
      this.scene.remove(tilemap);
      this.tilemaps.delete(chunk.id);
    }
  }

  override notify(_entityAddedOrRemoved: AddedEntity | RemovedEntity): void {
    const component = _entityAddedOrRemoved.data.get(PerlinChunkComponent);
    if (!component) return;

    if (isAddedSystemEntity(_entityAddedOrRemoved)) {
      this.createChunkMap(component);
    }

    if (isRemoveSystemEntity(_entityAddedOrRemoved)) {
      this.removeChunkMap(component);
    }
  }

  update() {
    return;
  }
}
