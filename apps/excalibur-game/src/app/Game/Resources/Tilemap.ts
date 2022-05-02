import { TiledMapResource } from '@excaliburjs/plugin-tiled';
import { ImageSource } from 'excalibur';

export const KenyyRougeLinkPack = new ImageSource(
  '/assets/kenny-rpg-urban-pack/tilemap_packed.png'
);
export const Tilemap = new TiledMapResource('/assets/example-city.tmx', {
  startingLayerZIndex: -2,
});
