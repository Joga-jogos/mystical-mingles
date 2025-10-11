import useGameControl from '../../useGameControl';
import Champion from '../Champion';

import './Arena.scss';

export default function Arena() {
    const { game, me, enemy } = useGameControl();

    const board = [
        Array.from(Array(11), () => ''),
        Array.from(Array(11), () => ''),
        Array.from(Array(11), () => ''),
    ];

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
                                        <Champion key={c.id} champion={c} />
                                    );
                                })
                            }
                            {
                                enemy.team.champions.map(c => {
                                    const exist = (10 - c.coordinates.x) === x && c.coordinates.y === Math.abs(y - 2);
                                    return exist && (
                                        <Champion key={c.id} direction="right" champion={c} />
                                    );
                                })
                            }
                        </div>
                    ));
                })
            }
        </div>
    );
}