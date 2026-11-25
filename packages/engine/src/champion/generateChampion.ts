import Mingle, { generateMingle } from '../mingle';

import Champion from './champion';
import type { Coordinates } from './interface';

export function generateChampion(coordinates: Coordinates) {
  return new Champion({
    coordinates,
    mingle: new Mingle({ ...generateMingle() })
  });
}
