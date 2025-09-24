import { Timestamp } from 'firebase-admin/firestore';
import { logger } from 'firebase-functions';

import Game from '@mystical-mingles/engine/game';

import type {
    MatchmakingData,
    MatchmakingRound,
} from '@mystical-mingles/services/matchmaking';
import { toGame, toMatchmaking } from '@mystical-mingles/services/matchmaking';

import type { DB } from '../core';

type InitGame = {
    id: string;
    db: DB,
    matchmaking: MatchmakingData;
}

export async function initGame({ id, matchmaking, db }: InitGame) {
    const players = toGame.mapPlayer(matchmaking.players);

    const game = new Game({
        id: '',
        round: 1,
        createdAt: new Date(),
        priority: [],
        players
    });

    game.setPriority();

    game.players[0].team.deckManager.buyCards(6);
    game.players[1].team.deckManager.buyCards(6);

    logger.debug('>>> cartas escolhidas', game.players[1].team.deckManager.hand);

    await db.setItem<MatchmakingRound>({
        data: {
            id: 1,
            actions: [],
            whoSawTheAnimation: [],
            whoHasAlreadyPlayed: [],
            priority: game.priority,
            updatedAt: Timestamp.fromDate(new Date()),
            players: toMatchmaking.mapPlayerRound(game.players)
        },
        segments: [
            { collection: 'matchmaking', doc: id },
            { collection: 'rounds', doc: 'Round1' },
        ],
    });

    await db.update<MatchmakingData>({
        segments: [{ collection: 'matchmaking', doc: id },],
        data: { status: 'ready' }
    });
}