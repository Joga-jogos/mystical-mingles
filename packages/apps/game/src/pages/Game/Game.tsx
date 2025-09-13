import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import type { GameOptions } from '@mystical-mingles/engine/game';

import { useMatchmaking } from '@mystical-mingles/common/Matchmaking';

import useGame from './useGame';
import HUD from './components/HUD';
import ArenaComponent from './components/Arena';
import GameProvider from './GameProvider';

interface ArenaProps {
    gameOptions: GameOptions;
}

export function Arena({ gameOptions }: ArenaProps) {
    const game = useGame({
        id: gameOptions.id,
        round: gameOptions.round,
        players: gameOptions.players,
        createdAt: gameOptions.createdAt,
    }, []);

    if (!game) {
        return (
            <div>Carregando...</div>
        );
    }

    return (
        <GameProvider game={game}>
            <HUD>
                <ArenaComponent />
            </HUD>
        </GameProvider>
    );
}

export default function Game() {
    const { id } = useParams<{ id: string; }>();

    const { gameOptions, getMatchMaking } = useMatchmaking();

    useEffect(() => {
        if (!getMatchMaking) { return; }
        if (!id) { return; }

        getMatchMaking(id);
    }, []);

    if (!gameOptions) { return <>carregando...</>; }

    return (
        <Arena gameOptions={gameOptions} />
    );
}