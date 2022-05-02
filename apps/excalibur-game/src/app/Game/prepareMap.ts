import { TiledMapResource } from '@excaliburjs/plugin-tiled';
import { Actor, Color, vec } from 'excalibur';

import { Game } from '../Core/Game';

type PrepareMapProps = {
  game: Game;
  map: TiledMapResource;
  player: Actor;
};

export const prepareMap = ({ game, player, map }: PrepareMapProps) => {
  const excalibur = map.data.getExcaliburObjects();
  if (excalibur.length > 0) {
    const start = excalibur[0].getObjectByName('player-start');
    if (start) {
      player.pos.x = start.x;
      player.pos.y = start.y;
    }

    // Use polyline for patrols
    const lines = excalibur[0].getPolyLines();
    for (const line of lines) {
      if (line && line.polyline) {
        const start = vec(line.x, line.y);
        const firstpoint = line.polyline[0];
        const patrol = new Actor({
          x: line.x + firstpoint.x,
          y: line.y + firstpoint.y,
          color: Color.Green,
          width: 25,
          height: 25,
        });
        patrol.actions.repeatForever((ctx) => {
          for (const p of line.polyline ?? []) {
            ctx.moveTo(p.x + start.x, p.y + start.y, 100);
          }
        });
        game.add(patrol);
      }
    }

    // Use polygon for patrols
    const polys = excalibur[0].getPolygons();
    for (const poly of polys) {
      poly.polygon?.push(poly.polygon[0]); // needs to end where it started
      if (poly && poly.polygon) {
        const start = vec(poly.x, poly.y);
        const firstpoint = poly.polygon[0];
        const patrol = new Actor({
          x: poly.x + firstpoint.x,
          y: poly.y + firstpoint.y,
          color: Color.Green,
          width: 25,
          height: 25,
        });
        patrol.actions.repeatForever((ctx) => {
          for (const p of poly.polygon ?? []) {
            ctx.moveTo(p.x + start.x, p.y + start.y, 100);
          }
        });
        game.add(patrol);
      }
    }
  }
};
