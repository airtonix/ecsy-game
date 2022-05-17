import { ImageSource, Logger } from 'excalibur';

import { convertPath } from './convertPath';
import { TilesetDefinitionWithPath } from './ldtk';

export async function loadTilesetResource(
  tileset: TilesetDefinitionWithPath,
  basePath: string
) {
  const source = tileset.relPath;
  const resource = new ImageSource(convertPath(basePath, source));
  Logger.getInstance().debug(
    '[LDtk] Loading associated tileset: ' + resource.path
  );

  await resource.load();
  return { id: tileset.uid, resource };
}
