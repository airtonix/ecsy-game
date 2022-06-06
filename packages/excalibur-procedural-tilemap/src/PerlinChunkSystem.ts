/* eslint-disable no-console */
import {
  Actor,
  Entity,
  Logger,
  Scene,
  System,
  SystemType,
  Vector,
  vec,
} from 'excalibur';

import { getChunkCoordinates } from './getChunkCoordinates';
import { PerlinChunk } from './PerlinChunk';
import { PerlinChunkEntity } from './PerlinChunkEntity';
import {
  PerlinCameraPointComponent,
  PerlinCameraPointType,
} from './PerlinCameraPointComponent';
import { hashPosition } from './hashPosition';

export class PerlinChunkSystem extends System<
  PerlinCameraPointComponent,
  Scene
> {
  systemType = SystemType.Update;
  types = [PerlinCameraPointType] as const;

  /** the center of the chunk drawing radius */
  camera: Vector | null = null;

  chunkData = new Map<string, PerlinChunk>();
  chunks = new Map<string, Actor>();

  /** the scene that renders our chunks */
  scene!: Scene;

  log = Logger.getInstance();

  constructor(
    public tileSize = 32,
    public chunkSize = 4,
    public viewRadiusChunks = 3,
    public chunkPixelSize = tileSize * chunkSize,
    public viewRadiusPixels = viewRadiusChunks * chunkPixelSize
  ) {
    super();
  }

  override initialize(scene: Scene) {
    this.scene = scene;
  }

  update(entities: Entity[]) {
    for (const entity of entities) {
      const center = entity.get(PerlinCameraPointComponent);
      if (!center) continue;

      const { pos } = getChunkCoordinates(
        center.point,
        this.chunkSize,
        this.tileSize
      );

      for (
        let x = pos.x - this.viewRadiusChunks;
        x < pos.x + this.viewRadiusChunks;
        x++
      ) {
        for (
          let y = pos.y - this.viewRadiusChunks;
          y < pos.y + this.viewRadiusChunks;
          y++
        ) {
          const position = vec(
            x * this.chunkPixelSize,
            y * this.chunkPixelSize
          );
          const id = hashPosition(position);

          if (!this.chunkData.get(id)) {
            const newChunk = new PerlinChunk({
              position,
              chunkSize: this.chunkSize,
              tileSize: this.tileSize,
            });
            newChunk.generate();
            this.chunkData.set(id, newChunk);
          }
        }
      }

      for (const chunk of this.chunkData.values()) {
        const id = chunk.id;
        const existing = this.chunks.get(id);
        const distance = chunk.distance(center.point);
        const isInView = distance <= this.viewRadiusPixels;
        const isOutView = distance > this.viewRadiusPixels;

        if (isInView && !existing) {
          this.addChunk(
            id,
            PerlinChunkEntity({
              chunk,
              size: this.chunkPixelSize,
            })
          );
        } else if (isOutView && !!existing) {
          this.removeChunk(id, existing);
          continue;
        }
      }
    }
  }

  removeChunk(id: string, chunk: Actor) {
    this.scene.remove(chunk);
    this.chunks.delete(id);
  }
  addChunk(id: string, chunk: Actor) {
    this.chunks.set(id, chunk);
    this.scene.add(chunk);
  }
}
