import { Timestamp } from 'firebase-admin/firestore';

import Game from '@mystical-mingles/engine/game';

import {
    toGame,
    toMatchmaking,
    type MatchmakingData,
    type MatchmakingRound,
} from '@mystical-mingles/services/matchmaking';

import { DB } from '../core';

interface SetNextRound {
    db: DB,
    round: MatchmakingRound;
    matchmaking: MatchmakingData;
}

export async function setNextRound({ matchmaking, round, db }: SetNextRound) {
    const players = toGame.mapPlayer(matchmaking.players);

    const game = new Game({
        id: '',
        round: 1,
        createdAt: new Date(),
        priority: [],
        players
    });

    game.setPriority();
    game.players.forEach(player => {
        player.team.deckManager.buyCards(3);
        player.team.energyManager.recover(2);
    });

    await db.setItem<MatchmakingRound>({
        data: {
            id: round.id + 1,
            updatedAt: Timestamp.fromDate(new Date()),
            actions: [],
            whoSawTheAnimation: [],
            whoHasAlreadyPlayed: [],
            priority: game.priority,
            players: toMatchmaking.mapPlayerRound(players)
        },
        segments: [
            { collection: 'matchmaking', doc: matchmaking.id },
            { collection: 'rounds', doc: 'Round1' },
        ],
    });

    await db.update<MatchmakingData>({
        data: { status: 'ready' },
        segments: [
            { collection: 'matchmaking', doc: matchmaking.id }
        ]
    });
};