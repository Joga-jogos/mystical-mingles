import { useEffect } from 'react';

import { runInSequence } from '@mystical-mingles/toolkit/promise';

import type { MatchmakingAction, MatchmakingRound } from '@mystical-mingles/services/matchmaking';

import useGameControl from '@/pages/Game/useGameControl';

import { goTo, goBack } from './movement';
import { attack } from './attack';

import './Animate.scss';

export default function Animate() {
    const { game, round, me } = useGameControl();

    useEffect(() => {
        if (!round) { return; }

        animate(round);
    }, [round]);

    const animate = async (round: MatchmakingRound) => {
        if (!game) { return <></>; }
        if (!me) { return <></>; }

        const championActions = game.turnOrder.reduce<{ [x: string]: MatchmakingAction[] }>((acc, champion) => {
            const championActions = round.actions.filter(action => action.actor.mingle.id === champion.id);

            acc[champion.id] = championActions;

            return acc;
        }, {});

        for (const [id, actions] of Object.entries(championActions)) {
            if (!actions.length) { continue; }

            const isEnemy = me.team.champions.some(c => c.id === id);

            let haveMovedYet = false;

            for (const [index, action] of Array.from(actions).entries()) {
                const { target, actor, type, damage, miss, critical, truedamage } = action;

                if (!target.mingle.id) { continue; };

                const elChampion = document.getElementById(id);

                if (!elChampion) { continue; };

                const elTarget = document.getElementById(target.mingle.id);

                if (!elTarget) { continue; };

                const championActor = game.alive.find(c => c.id === id);
                const championTarget = game.alive.find(c => c.id === target.mingle.id);

                if (!championActor || !championTarget) { continue; };

                if (type === 'melee' && !haveMovedYet) {
                    await goTo(elChampion, elTarget, isEnemy);
                    haveMovedYet = true;
                };

                await attack(
                    elChampion,
                    elTarget,
                    { ...action, critical: true },
                    () => {
                        if (miss) { return; }

                        if (truedamage) { championTarget.takeTrueDamage(damage); }

                        if (!truedamage) { championTarget.takeDamage(damage); }

                        game.update({
                            players: [game.players[0], game.players[1]]
                        });

                        return;
                    }
                );

                const isTheLastAction = (actions.length - 1) === index;

                if (isTheLastAction && haveMovedYet) { await goBack(elChampion); }

                console.log('ACABOU TUDO');
            }
        }
    };

    return (<></>);
}