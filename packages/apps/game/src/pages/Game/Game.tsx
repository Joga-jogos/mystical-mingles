import { useEffect } from 'react';

import type { GameOptions } from '@mystical-mingles/engine/game';

import { useMatchmaking } from '@mystical-mingles/common/Matchmaking';
import { useAuth } from '@mystical-mingles/common/Auth';

import useGame from './useGame';
import HUD from './components/HUD';
import Arena from './components/Arena';
import GameProvider from './GameProvider';

interface GameBaseProps {
    gameOptions: GameOptions
}

export function GameBase({ gameOptions }: GameBaseProps) {
    const { user } = useAuth();

    const game = useGame({
        id: gameOptions.id,
        round: gameOptions.round,
        players: gameOptions.players,
        createdAt: gameOptions.createdAt,
        priority: gameOptions.priority
    }, []);

    return (
        <GameProvider game={game}>
            user: {user?.email}
            <HUD>
                <Arena />
            </HUD>
        </GameProvider>
    );
}

export default function Game() {
    const { gameOptions, getMatchMaking } = useMatchmaking();

    useEffect(() => {
        if (!getMatchMaking) { return; }

        getMatchMaking();
    }, []);

    if (!gameOptions) { return <>carregando...</>; }

    return (
        <GameBase gameOptions={gameOptions} />
    );
}