import { TiledMapResource } from '@excaliburjs/plugin-tiled';
import { ImageSource } from 'excalibur';

export const KenyyRougeLikePack = new ImageSource(
  '/assets/kenny-rpg-urban-pack/tilemap_packed.png'
);
export const KenyyRougeLikeTilemap = new TiledMapResource(
  '/assets/KenyyRougeLikeCity.tmx',
  {
    startingLayerZIndex: -2,
  }
);

export const WorldTilemap = new TiledMapResource('/assets/world.tmx', {
  startingLayerZIndex: -2,
});
