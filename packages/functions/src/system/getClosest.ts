import { getRandom } from '@mystical-mingles/toolkit/array';

import type Champion from '@mystical-mingles/engine/champion';
import type { Species } from '@mystical-mingles/engine/species';

const calculateDistance = (champion: Champion<Species>, enemy: Champion<Species>) => {
  const x = Math.pow(champion.coordinates.x - (10 - enemy.coordinates.x), 2);
  const y = Math.pow(champion.coordinates.y - enemy.coordinates.y, 2);

  return Math.sqrt(x + y);
};

export const getClosest = (champion: Champion<Species>, enemies: Champion<Species>[]) => {
  const closest = enemies
    .filter(e => e.isAlive)
    .map(enemy => {
      const distance = calculateDistance(champion, enemy);
      return { id: enemy.id, distance };
    })
    .sort((a, b) => a.distance > b.distance ? 1 : -1)
    .filter((enemy, _, ordered) => enemy.distance === ordered[0].distance);

  const id = getRandom(closest).id;

  return enemies.find(enemy => enemy.id === id) as Champion<Species>;
};