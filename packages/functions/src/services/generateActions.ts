import Game from '@mystical-mingles/engine/game';

import type { MatchmakingData, MatchmakingRound, MatchmakingAction } from '@mystical-mingles/services/matchmaking';
import { toGame, toMatchmaking } from '@mystical-mingles/services/matchmaking';

import type { DB } from '../core';
import { getAction } from '../system/getAction';
import { getTarget } from '../system/getTarget';

interface GenerateActions {
    db: DB;
    round: MatchmakingRound;
    lastRound: MatchmakingRound;
    matchmaking: MatchmakingData;
}

export function generateActions({ matchmaking, round, db }: GenerateActions) {
    const players = toGame.mapPlayer(matchmaking.players, round);

    const game = new Game({
        id: '',
        round: round.id,
        createdAt: new Date(),
        priority: round.priority,
        players
    });

    const roundActions = game.turnOrder.reduce<MatchmakingAction[]>((acc, champion) => {
        const me = game.players.find(p =>
            p.team.champions.some(c => c.id === champion.id)
        );

        const challenger = game.players.find(team => team.id !== me.id);

        const cards = round.players[me.id].inPlay[champion.id];

        if (!cards.length) { return acc; }

        const target = getTarget({
            card: cards[0],
            champion,
            team: challenger.team,
        });

        // VIRIFIACAR SE O MINGLE VAI FICAR VIVO ANTES DE CALCULAR AS AÇÕES
        const actionsTarget = acc.find(a => a.target.mingle.id === target.id);

        const actions = cards.map<MatchmakingAction>(cardOptions => {
            return getAction({
                me,
                challenger,
                champion,
                target,
                cardOptions,
            });
        });

        acc = [...acc, ...actions];

        return acc;
    }, []).filter(Boolean);

    return db.update<MatchmakingRound>({
        data: {
            actions: roundActions,
            players: toMatchmaking.mapPlayerRound(game.players),
            status: 'animating',
        },
        segments: [
            { collection: 'matchmaking', doc: matchmaking.id },
            { collection: 'rounds', doc: `Round${round.id}` },
        ]
    });
}