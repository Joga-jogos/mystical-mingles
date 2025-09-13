import useGameControl from '../../useGameControl';
import Champion from '../Champion';

export default function Arena() {
    const game = useGameControl();

    if (!game) { return; }

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {
                game.players[0].team.alives.map(champion => (
                    <Champion key={champion.id} champion={champion} />
                ))
            }

            {
                game.players[1].team.alives.map(champion => (
                    <Champion key={champion.id} champion={champion} />
                ))
            }
        </div>
    );
}