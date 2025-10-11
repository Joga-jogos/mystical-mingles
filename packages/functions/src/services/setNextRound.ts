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
    lastRound: MatchmakingRound;
    matchmaking: MatchmakingData;
}

export async function setNextRound({ matchmaking, lastRound, round, db }: SetNextRound) {
    const players = toGame.mapPlayer(matchmaking.players, round);

    const game = new Game({
        id: '',
        round: round.id,
        createdAt: new Date(),
        priority: [],
        players
    });

    game.setPriority();

    // ATUALIZA O NOVO ROUND
    game.players.forEach(player => {
        player.team.deckManager.buyCards(3);
        player.team.deckManager.resetInPlay();
        player.team.energyManager.recover(2);

        player.team.champions.forEach(champion => {
            const ref = round.players[player.id].championsState[champion.id];
            const lastRoundRef = lastRound.players[player.id].championsState[champion.id];

            champion.lastLife = lastRoundRef.life;
            champion.life = ref.life;
            champion.buffs = ref.buffs;
            champion.debuffs = ref.debuffs;
        });

        player.team.champions.forEach(c => {
            c.shield = 0;
        });
    });

    const newRound = round.id + 1;

    return await db.setItem<MatchmakingRound>({
        data: {
            id: newRound,
            status: 'playing',
            priority: game.priority,
            actions: [],
            whoSawTheAnimation: [],
            whoHasAlreadyPlayed: [],
            updatedAt: Timestamp.fromDate(new Date()),
            players: toMatchmaking.mapPlayerRound(players)
        },
        segments: [
            { collection: 'matchmaking', doc: matchmaking.id },
            { collection: 'rounds', doc: `Round${newRound}` },
        ],
    });
};