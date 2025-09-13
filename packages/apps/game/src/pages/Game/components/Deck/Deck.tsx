import Stack from '@mystical-mingles/ui/components/Stack';

import type Champion from '@mystical-mingles/engine/champion';
import type { Species } from '@mystical-mingles/engine/species';
import { ActiveParts } from '@mystical-mingles/engine/parts';
import type Card from '@mystical-mingles/engine/card';

import CardComponent from '../Card';

import './Deck.scss';

interface DeckProps {
    order: number;
    champion: Champion<Species>;
    cards: Card<Species, ActiveParts>[];
    onChoose: (card: Card<Species, ActiveParts>) => void;
}

export default function Deck({ order, champion, cards, onChoose }: DeckProps) {
    const handleChoose = (card: Card<Species, ActiveParts>) => { onChoose(card); };

    return (
        <Stack flexDirection="column" alignItems="center" gap={5} className="deck">
            <label>{order}</label>
            {champion.name}
            <Stack>
                {
                    cards
                        .sort((a, b) => a.name > b.name ? 1 : -1)
                        .map((card) => (
                            <button key={card.id} onClick={() => handleChoose(card)}>
                                <CardComponent card={card} />
                            </button>
                        ))
                }
            </Stack>
        </Stack>
    );
}