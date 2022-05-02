import { Loader as ExcaliburLoader, vec } from 'excalibur';

import { BaseImage } from './Character';
import { KenyyRougeLinkPack, Tilemap } from './Tilemap';
export const Loader = new ExcaliburLoader([
  Tilemap,
  BaseImage,
  KenyyRougeLinkPack,
]);
Loader.backgroundColor = '#222034';
Loader.logo =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABKUlEQVR4nO2Zyw3CQAxEDaIQRA1c00Ok1BkpPeRKDSidwCkShyDhJetn2HnXrLKT8dj5mQkhWubw7sDlfH1ECqnNfbltXusxWkg2ZAAtgKZ5A06exd041dKxK/PQf7zWZYD35ATeIjXfAjLAszh7/EtQAmgBNDLAs/hXngM8aAjSAmhkAC2AniuoAd042Tz0qAm6C1Abr9U3MzQF+AygQQx4rf4KlQIlIHrDreqTpEoA0QahBmSrvlmyBJjFpyDMgIzVN0uYgGhCDPBWP7INlIDaG5T2flQKlICaJ/928kekwP1z1MMeF1D71lnVALP8X5I1A2gBNDKAFkAjA2gBNDKAFkAjA2gBNDKAFkDjfhn6tz/ELgOyv9mV0HwLyABaAE3zBgghRNM8AZtGTHr3iDSpAAAAAElFTkSuQmCC';
Loader.logoPosition = vec(
  window.innerWidth / 2 - 32,
  window.innerHeight / 2 - 64
);
