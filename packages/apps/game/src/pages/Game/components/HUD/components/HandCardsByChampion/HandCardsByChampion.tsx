import type Champion from '@mystical-mingles/engine/champion';
import type { Species } from '@mystical-mingles/engine/species';

import useGameControl from '@/pages/Game/useGameControl';

import CardComponent from '../../../Card';

import './HandCardsByChampion.scss';

interface HandCardsByChampionProps {
    champion: Champion<Species>;
    onRemoveFromHand: (champion: Champion<Species>) => void;
}

export default function HandCardsByChampion({ champion, onRemoveFromHand }: HandCardsByChampionProps) {
    const game = useGameControl();

    if (!game) { return; }

    const handleRemoveHand = () => { onRemoveFromHand(champion); };

    return (
        <div className="hand-cards">
            {
                game.players[0].team.hand[champion.id] &&
                game.players[0].team.hand[champion.id].map((card, index) => (
                    <button
                        key={card.id}
                        className="hand-cards__card"
                        style={{ bottom: -(70 + (40 * index)) }}
                        onClick={handleRemoveHand}
                    >
                        <CardComponent card={card} />
                    </button>
                ))
            }
        </div>
    );
}