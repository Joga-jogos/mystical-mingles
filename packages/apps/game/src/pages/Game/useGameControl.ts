import { useContext } from 'react';

import { GameContext } from './GameProvider';

export default function useGameControl() {
    return useContext(GameContext);
}