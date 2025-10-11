import { createContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';

import type Game from '@mystical-mingles/engine/game';
import type Player from '@mystical-mingles/engine/player';

import { toGame, type MatchmakingRound } from '@mystical-mingles/services/matchmaking';

import { useAuth } from '@mystical-mingles/common/Auth';
import { useMatchmaking } from '@mystical-mingles/common/Matchmaking';

import AnimateProvider from '@/providers/AnimateProvider';

type GameContextConfig = {
    game?: Game;
    round?: MatchmakingRound;

    me?: Player;
    enemy?: Player;

    hasAlreadyPlayed?: boolean;
};

export const GameContext = createContext<GameContextConfig>({});

export default function GameProvider({ game, children }: PropsWithChildren<{ game: Game }>) {
    const { user } = useAuth();

    const { gameOptions, matchmaking, subscriptionRounds, leaveRound } = useMatchmaking();

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
        hasAlreadyPlayed: round?.whoHasAlreadyPlayed.some(id => id === user?.id)
    }), [game, round]);

    useEffect(() => {
        if (!leaveRound) { return; }
        if (!subscriptionRounds) { return; }
        if (!gameOptions) { return; }

        subscriptionRounds(gameOptions.id, (round) => {
            if (!context.enemy) { return; }
            if (!context.me) { return; }
            if (!user) { return; }
            console.log('>>>>>>>>> STATUS:', round.id, round.status);

            const nobodyPlayedCards = round.whoHasAlreadyPlayed.length === 0;
            const nobodySawAnimation = round.whoSawTheAnimation.length === 0;

            const everyoneHasAlreadyPlayed = round.whoHasAlreadyPlayed.length === 2;
            const everyoneHasAlreadySawAnimation = round.whoSawTheAnimation.length === 2;

            setRound(round);

            if (everyoneHasAlreadyPlayed && everyoneHasAlreadySawAnimation) {
                console.log('ESTÃO JOGANDO');
                return;
            }

            if (everyoneHasAlreadyPlayed && !everyoneHasAlreadySawAnimation) {
                console.log('ATAUALIZA AS CARTAS PARA VER A ANIMAÇÃO');
                updateGame(round, { shouldUpdateLife: false });
                return;
            }

            if (nobodyPlayedCards && nobodySawAnimation) {
                console.log('COMEÇANDO UM NOVO ROUND');
                updateGame(round);
                return;
            }
        });

        return () => { leaveRound(); };
    }, []);

    const updateGame = (round: MatchmakingRound, options?: toGame.MapPlayersOptions) => {
        if (!context.enemy) { return; }
        if (!context.me) { return; }
        if (!matchmaking) { return; }

        const players = toGame.mapPlayer(matchmaking.players, round, options);

        game.update({
            round: round.id,
            players
        });
    };

    return (
        <GameContext.Provider value={context}>
            <AnimateProvider>
                {children}
            </AnimateProvider>
        </GameContext.Provider>
    );
}