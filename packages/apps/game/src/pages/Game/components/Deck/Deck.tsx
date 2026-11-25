import Stack from '@mystical-mingles/ui/components/Stack';

import type Card from '@mystical-mingles/engine/card';
import type Champion from '@mystical-mingles/engine/champion';
import type { Species } from '@mystical-mingles/engine/species';
import { ActiveParts } from '@mystical-mingles/engine/parts';

import CardUI from '@mystical-mingles/common/Card';

import OrderItem from '../OrderItem';
import useGameControl from '../../useGameControl';

import './Deck.scss';

interface DeckProps {
    order: number;
    champion: Champion<Species>;
    cards: Card<Species, ActiveParts>[];
    onChoose: (card: Card<Species, ActiveParts>) => void;
}

export default function Deck({ order, champion, cards, onChoose }: DeckProps) {
    const { me } = useGameControl();

    const handleChoose = (card: Card<Species, ActiveParts>) => { onChoose(card); };

    if (!me) { return <></>; }

    return (
        <Stack
            gap={5}
            className="deck"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
        >
            <Stack gap={0} alignItems="center" justifyContent="center">
                {
                    cards
                        .sort((a, b) => a.name > b.name ? 1 : -1)
                        .map((card) => (
                            <div key={card.id} className="deck-card-container">
                                <button
                                    className="deck-card-button"
                                    onClick={() => handleChoose(card)}
                                >
                                    <CardUI card={card} />
                                </button>
                                <div className="deck-card-fake">
                                    <CardUI card={card} />
                                </div>
                            </div>
                        ))
                }
            </Stack>
            <div className="deck-mingle">
                <OrderItem
                    order={order}
                    champion={champion}
                    isEnemy={!me.team.champions.some(c => c.id === champion.id)}
                />
            </div>
        </Stack>
    );
}