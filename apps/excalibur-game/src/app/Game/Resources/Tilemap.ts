import { TiledMapResource } from '@excaliburjs/plugin-tiled';

export const KenyyRougeLikeTilemap = new TiledMapResource(
  '/assets/KenyyRougeLikeCity.tmx',
  {
    startingLayerZIndex: -2,
  }
);

export const WorldTilemap = new TiledMapResource('/assets/world.tmx', {
  startingLayerZIndex: -2,
});
