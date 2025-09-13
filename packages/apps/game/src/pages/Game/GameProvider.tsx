import { createContext, type PropsWithChildren } from 'react';

import Game from '@mystical-mingles/engine/game';

type GameContextConfig = {
    game?: Game;
};

export const GameContext = createContext<GameContextConfig>({});

export default function GameProvider({ game, children }: PropsWithChildren<{ game: Game }>) {
    return (
        <GameContext.Provider value={{ game }}>
            {children}
        </GameContext.Provider>
    );
}