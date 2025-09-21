import { Timestamp } from 'firebase-admin/firestore';

import type Champion from '@mystical-mingles/engine/champion';
import type { Species } from '@mystical-mingles/engine/species';

import type {
    ByPlayer,
    MatchmakingData,
    MatchmakingRound,
    MatchMakingRoundPlayer
} from '@mystical-mingles/services/matchmaking';
import { toGame } from '@mystical-mingles/services/matchmaking';

import type { DB } from '../core';
import { buyCards } from '../system/buyCards';
import { sortChampions } from '../system/getPriority';

type InitGame = {
    id: string;
    db: DB,
    matchmaking: MatchmakingData;
}

export async function initGame({ id, matchmaking, db }: InitGame) {
    const players = Object
        .entries(matchmaking.players)
        .reduce<ByPlayer<MatchMakingRoundPlayer>>((acc, [playerId, data]) => {
            const player: MatchMakingRoundPlayer = {
                deck: buyCards({
                    count: 12,
                    deck: data.deck,
                    champions: data.team.champions,
                }),
                hand: {},
                death: {},
                energy: 3,
                championsState: {}
            };

            acc[playerId] = player;

            return acc;
        }, {} as ByPlayer<MatchMakingRoundPlayer>);

    const priority = sortChampions(Object
        .values(matchmaking.players)
        .reduce<Champion<Species>[]>((acc, player) => {
            acc = [...acc, ...toGame.mapChampions(player.team.champions)];

            return acc;
        }, [])).map(c => c.id);

    await db.setItem<MatchmakingRound>({
        data: {
            id: 1,
            updatedAt: Timestamp.fromDate(new Date()),
            whoHasAlreadyPlayed: [],
            actions: [],
            priority,
            players
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