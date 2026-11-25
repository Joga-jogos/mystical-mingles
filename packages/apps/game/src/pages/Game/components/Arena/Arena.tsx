import { useState } from 'react';

import { useModal } from '@mystical-mingles/ui/components/Modal';

import type Champion from '@mystical-mingles/engine/champion';
import type { Species } from '@mystical-mingles/engine/species';

import ChampionUI from '../Champion';
import useGameControl from '../../useGameControl';
import ChampionDetailsModal from '../ChampionDetailsModal/ChampionDetailsModal';

import './Arena.scss';

export default function Arena() {
    const [open, toggle] = useModal();

    const { game, me, enemy } = useGameControl();

    const [champion, setChampion] = useState<Champion<Species>>();

    const board = [
        Array.from(Array(11), () => ''),
        Array.from(Array(11), () => ''),
        Array.from(Array(11), () => ''),
    ];

    const handleOpen = (champion: Champion<Species>) => {
        setChampion(champion);
        toggle();
    };

    if (!me || !enemy) { return; }

    if (!game) { return; }

    return (
        <div className="arena-container">
            {
                board.map((row, y) => {
                    return row.map((_, x) => (
                        <div key={`y${y}x${x}`} className="arena-slot">
                            {
                                me.team.champions.map(c => {
                                    const exist = c.coordinates.x === x && c.coordinates.y === Math.abs(y - 2);
                                    return exist && (
                                        <ChampionUI
                                            key={c.id}
                                            champion={c}
                                            onOpen={handleOpen}
                                        />
                                    );
                                })
                            }
                            {
                                enemy.team.champions.map(c => {
                                    const exist = (10 - c.coordinates.x) === x && c.coordinates.y === Math.abs(y - 2);
                                    return exist && (
                                        <ChampionUI
                                            key={c.id}
                                            direction="right"
                                            champion={c}
                                            onOpen={handleOpen}
                                        />
                                    );
                                })
                            }
                        </div>
                    ));
                })
            }
            {
                champion && (
                    <ChampionDetailsModal
                        isOpen={open}
                        champion={champion}
                        onToggleModal={toggle}
                    />
                )
            }
        </div>
    );
}