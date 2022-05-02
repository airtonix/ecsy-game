import { Loader as ExcaliburLoader } from 'excalibur';

import { BaseImage } from './Character';
import { KenyyRougeLinkPack, Tilemap } from './Tilemap';
export const Loader = new ExcaliburLoader([
  Tilemap,
  BaseImage,
  KenyyRougeLinkPack,
]);
