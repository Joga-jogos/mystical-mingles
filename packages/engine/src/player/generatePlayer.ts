import { uuid } from '@mystical-mingles/toolkit/uuid';

import { generateTeam } from '../team';

import Player from './player';

export function generatePlayer() {
    return new Player({
        id: uuid(),
        team: generateTeam()
    });
}