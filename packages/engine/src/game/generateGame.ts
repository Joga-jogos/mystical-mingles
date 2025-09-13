import { uuid } from '@mystical-mingles/toolkit/uuid';

import { generatePlayer } from '../player';

import Game from './game';

export function generateGame() {
    return new Game({
        id: uuid(),
        createdAt: new Date(),
        round: 1,
        players: [
            generatePlayer(),
            generatePlayer(),
        ]
    });
}