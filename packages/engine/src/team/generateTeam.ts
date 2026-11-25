import { getFilledArray } from '@mystical-mingles/toolkit/array';

import { type Coordinates, generateChampion } from '../champion';

import Team from './team';
import { generateTeamName } from './generateTeamName';

export function generateTeam() {
  const name = generateTeamName();

  const COORDINATES: Coordinates[] = [
    { x: 1, y: 2 },
    { x: 3, y: 2 },
    { x: 4, y: 1 },
  ];

  return new Team({
    name,
    champions: getFilledArray(3)
      .map((_, index) => generateChampion(COORDINATES[index]))
  });
}