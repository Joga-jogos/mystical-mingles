import { createContext, type PropsWithChildren, useEffect, useMemo, useState } from 'react';

import type Champion from '@mystical-mingles/engine/champion';
import type { Species } from '@mystical-mingles/engine/species';

import type { MatchmakingAction, MatchmakingRound } from '@mystical-mingles/services/matchmaking';

import useGameControl from '@/pages/Game/useGameControl';

import { attack } from './animation/attack';
import { goTo, goBack } from './animation/movement';

import './Animate.scss';
import { wait } from '@mystical-mingles/toolkit/promise';

interface AnimateContextConfig {
    actor?: Champion<Species>;

    animate: (round: MatchmakingRound) => Promise<void>;
}

export const AnimateContext = createContext<AnimateContextConfig>({
    actor: undefined,

    animate: () => Promise.resolve(),
});

export default function Animate({ children }: PropsWithChildren) {
    const { game, round, me, enemy } = useGameControl();

    const [actor, setActor] = useState<Champion<Species>>();

    const context = useMemo<AnimateContextConfig>(() => ({
        actor,

        animate: (round) => animate(round)
    }), [actor, game, round]);

    useEffect(() => {
        if (!round) { return; }

        animate(round);
    }, [round]);

    const animate = async (round: MatchmakingRound) => {
        if (!game) { return; }
        if (!me) { return; }
        if (!enemy) { return; }

        const championActions = game.turnOrder.reduce<{ [x: string]: MatchmakingAction[] }>((acc, champion) => {
            const championActions = round.actions.filter(action => action.actor.mingle.id === champion.id);

            acc[champion.id] = championActions;

            return acc;
        }, {});

        try {
            for (const [id, actions] of Object.entries(championActions)) {
                console.log('>>> id', id);

                if (!actions.length) { continue; }

                const itsMine = me.team.champions.some(c => c.id === id);

                let haveMovedYet = false;

                setActor(undefined);
                await wait(() => { }, 500);

                for (const [index, action] of Array.from(actions).entries()) {
                    const { target, type, damage, miss, critical, truedamage } = action;

                    if (!target.mingle.id) { continue; };

                    const elChampion = document.getElementById(id);

                    if (!elChampion) { continue; };

                    const elTarget = document.getElementById(target.mingle.id);

                    if (!elTarget) { continue; };

                    const championActor = game.alive.find(c => c.id === id);
                    const championTarget = game.alive.find(c => c.id === target.mingle.id);

                    if (!championActor || !championTarget) { continue; };

                    setActor(championActor);

                    await wait(() => { }, 1000);

                    if (type === 'melee' && !haveMovedYet) {
                        await goTo(elChampion, elTarget, !itsMine);
                        haveMovedYet = true;
                    };

                    await attack(
                        elChampion,
                        elTarget,
                        action,
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
                }
            }
        } finally {
            setActor(undefined);
        }
    };

    return (
        <AnimateContext.Provider value={context}>
            {children}
        </AnimateContext.Provider>
    );
}