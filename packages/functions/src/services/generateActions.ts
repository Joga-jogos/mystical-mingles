import Game from '@mystical-mingles/engine/game';

import type { MatchmakingData, MatchmakingRound, MatchmakingAction } from '@mystical-mingles/services/matchmaking';
import { toGame } from '@mystical-mingles/services/matchmaking';

import type { DB } from '../core';
import { getTarget } from '../system/getTarget';
import { getDamage } from '../system/getDamage';

interface GenerateActions {
    db: DB;
    round: MatchmakingRound;
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

        const cards = round.players[me.id].hand[champion.id];

        if (!cards) { return; }

        const actions = cards.map<MatchmakingAction>(cardOptions => {
            const card = me.team.deckManager.inPlay[champion.id]
                .find(card => card.name === cardOptions.name);
            // const isMelee = card.type === 'melee';

            const target = getTarget({
                card,
                champion,
                team: challenger.team,
            });

            // INICIAR CALCULO DE DANO
            const { critical, damage, miss, truedamage } = getDamage({
                champion,
                target,
                card,
                meTeam: me.team,
                challangerTeam: challenger.team
            });

            if (truedamage) { target.takeTrueDamage(damage); }
            if (!truedamage) { target.takeDamage(damage); }

            return {
                type: card.type,
                actor: champion.options,
                target: target.options,
                critical,
                damage,
                miss,
                truedamage,
            };
        });

        acc = [...acc, ...actions];

        return acc;
    }, []).filter(Boolean);

    return db.update<MatchmakingRound>({
        data: { actions: roundActions },
        segments: [
            { collection: 'matchmaking', doc: matchmaking.id },
            { collection: 'rounds', doc: `Round${round.id}` },
        ]
    });
}