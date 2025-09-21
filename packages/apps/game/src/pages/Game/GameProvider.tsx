import { createContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';

import type Game from '@mystical-mingles/engine/game';
import type Player from '@mystical-mingles/engine/player';
import type { Deck } from '@mystical-mingles/engine/team';
import Card from '@mystical-mingles/engine/card';

import type { MatchmakingRound } from '@mystical-mingles/services/matchmaking';

import { useAuth } from '@mystical-mingles/common/Auth';
import { useMatchmaking } from '@mystical-mingles/common/Matchmaking';

import Animate from '@/guards/Animate';

type GameContextConfig = {
    game?: Game;
    round?: MatchmakingRound;
    me?: Player;
    enemy?: Player;
};

export const GameContext = createContext<GameContextConfig>({});

export default function GameProvider({ game, children }: PropsWithChildren<{ game: Game }>) {
    const { user } = useAuth();

    const { gameOptions, subscriptionRounds, leaveRoom } = useMatchmaking();

    const [round, setRound] = useState<MatchmakingRound>();

    const { meIndex, enemyIndex } = useMemo(() => ({
        meIndex: game.players.findIndex(player => player.id === user?.id),
        enemyIndex: game.players.findIndex(player => player.id !== user?.id),
    }), [game]);

    const context = useMemo<GameContextConfig>(() => ({
        game,
        round,
        me: game.players[meIndex],
        enemy: game.players[enemyIndex],
    }), [game, round]);

    useEffect(() => {
        if (!leaveRoom) { return; }
        if (!subscriptionRounds) { return; }
        if (!gameOptions) { return; }

        subscriptionRounds(gameOptions.id, (round) => {
            if (!context.enemy) { return; }
            if (!context.me) { return; }

            if (round.whoHasAlreadyPlayed.length !== 2) { return; }

            const enemyHand: Deck = Object.entries(round.players[context.enemy.id].hand)
                .reduce<Deck>((acc, [id, cards]) => {
                    acc[id] = cards.map(card => new Card(card));

                    return acc;
                }, {});

            context.enemy.team.hand = enemyHand;

            game.update({
                players: [context.me, context.enemy],
            });

            setRound(round);
        });

        return () => { leaveRoom(); };
    }, []);

    return (
        <GameContext.Provider value={context}>
            <Animate />
            {children}
        </GameContext.Provider>
    );
}