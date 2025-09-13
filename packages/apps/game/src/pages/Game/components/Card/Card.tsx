import type { HTMLAttributes } from 'react';

import type Card from '@mystical-mingles/engine/card';
import type { Species } from '@mystical-mingles/engine/species';
import type { ActiveParts } from '@mystical-mingles/engine/parts';

import './Card.scss';
import joinClass from '../../../../../../../ui/src/utils/joinClass/joinClass';

interface CardProps extends HTMLAttributes<HTMLElement> {
    card: Card<Species, ActiveParts>;
}

export default function CardComponent({ card, ...props }: CardProps) {
    const classess = joinClass(['card', props.className]);

    return (
        <div className={classess} {...props}>
            {card.id.slice(0, 5)} - {card.name}
        </div>
    );
}