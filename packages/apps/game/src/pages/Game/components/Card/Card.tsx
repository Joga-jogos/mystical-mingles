import type { HTMLAttributes } from 'react';

import Stack from '@mystical-mingles/ui/components/Stack';
import Tooltip from '@mystical-mingles/ui/components/Tooltip';
import joinClass from '@mystical-mingles/ui/utils/joinClass';

import type Card from '@mystical-mingles/engine/card';
import type { Species } from '@mystical-mingles/engine/species';
import type { ActiveParts } from '@mystical-mingles/engine/parts';

import './Card.scss';

interface CardProps extends HTMLAttributes<HTMLElement> {
    card: Card<Species, ActiveParts>;
}

export default function CardComponent({ card, ...props }: CardProps) {
    const classess = joinClass(['card', props.className]);

    return (
        <Tooltip direction="top" label={
            <Stack>
                <pre>
                    {
                        JSON.stringify({
                            shield: card.shield,
                            cost: card.cost,
                            effect: card.effect,
                            attack: card.attack,
                            species: card.species,
                            type: card.type,
                        }, null, 2)
                    }
                </pre>
            </Stack>
        }>
            <div className={classess} {...props}>
                {card.id.slice(0, 5)} - {card.name}
            </div>
        </Tooltip>
    );
}