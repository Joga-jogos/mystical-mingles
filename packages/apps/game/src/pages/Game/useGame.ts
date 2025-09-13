import { useEffect, useState } from 'react';

import Game, { type GameOptions } from '@mystical-mingles/engine/game';

export default function useGame(_game: GameOptions, deps: any[]) {
    const [game, setGame] = useState<Game>(new Game(_game));

    useEffect(() => {
        setGame(new Game(_game));
    }, [...deps]);

    const updateGame = (data: Partial<GameOptions>) => {
        setGame(prev => {

            console.log('>>> DATA', data);
            console.log('>>> PREV', prev);

            const newGame = new Game({
                ...prev,
                ...data,
                players: (data.players || prev.players)?.map(p => ({
                    ...p,

                }))
            });

            newGame.update = prev.update;

            return newGame;
        });
    };

    game.update = updateGame;

    return game;
}