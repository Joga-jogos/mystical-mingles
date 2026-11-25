import { createContext, type PropsWithChildren, useEffect, useMemo, useState } from 'react';

import { wait } from '@mystical-mingles/toolkit/promise';

import type Champion from '@mystical-mingles/engine/champion';
import type { Species } from '@mystical-mingles/engine/species';

import type { MatchmakingAction, MatchmakingRound } from '@mystical-mingles/services/matchmaking';

import { useMatchmaking } from '@mystical-mingles/common/Matchmaking';

import useGameControl from '@/pages/Game/useGameControl';

import { attack } from './animation/attack';
import { goTo, goBack } from './animation/movement';

import './Animate.scss';

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
  const { endAnimation } = useMatchmaking();

  const [actor, setActor] = useState<Champion<Species>>();
  const [sawTheAnimation, setSawTheAnimation] = useState(false);

  const context = useMemo<AnimateContextConfig>(() => ({
    actor,

    animate: (round) => animate(round)
  }), [actor, game, round]);

  useEffect(() => {
    if (!round) { return; }
    if (!me) { return; }
    if (!endAnimation) { return; }

    const nobodyPlayedCards = round.whoHasAlreadyPlayed.length === 0;
    const nobodySawAnimation = round.whoSawTheAnimation.length === 0;
    const isPlaying = round.status === 'playing';

    if (nobodyPlayedCards && nobodySawAnimation && isPlaying) { setSawTheAnimation(false); }

    const shouldNotSeeTheAnimation =
            round.status !== 'animating'
            || round.whoSawTheAnimation.includes(me.id)
            || sawTheAnimation;

    if (shouldNotSeeTheAnimation) { return; }

    setSawTheAnimation(true);

    animate(round).then(async () => {
      await endAnimation(me, round);
    });
  }, [round, sawTheAnimation]);

  const animate = async (round: MatchmakingRound) => {
    if (!game) { return; }
    if (!me) { return; }
    if (!enemy) { return; }
    if (!endAnimation) { return; }

    const championActions = game.turnOrder.reduce<{ [x: string]: MatchmakingAction[] }>((acc, champion) => {
      const championActions = round.actions.filter(action => action.actor.mingle.id === champion.id);

      acc[champion.id] = championActions;

      return acc;
    }, {});

    try {
      for (const [id, actions] of Object.entries(championActions)) {
        if (!actions.length) { continue; }

        const itsMine = me.team.champions.some(c => c.id === id);

        let haveMovedYet = false;

        setActor(undefined);

        await wait(() => { }, 500);

        for (const [index, action] of Array.from(actions).entries()) {
          const { target, type, damage, miss, truedamage } = action;

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

          elChampion.style.zIndex = '6';
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