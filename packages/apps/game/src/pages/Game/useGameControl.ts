import { useContext } from 'react';

import { GameContext } from './GameProvider';

export default function useGameControl() {
    const { game } = useContext(GameContext);

    return game;
}