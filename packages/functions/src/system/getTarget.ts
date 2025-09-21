
import type Team from '@mystical-mingles/engine/team';
import type Champion from '@mystical-mingles/engine/champion';
import type { Species } from '@mystical-mingles/engine/species';
import type { Backdoor } from '@mystical-mingles/engine/effect';
import type { ActiveParts } from '@mystical-mingles/engine/parts';
import type { CardOptionsLock } from '@mystical-mingles/engine/card';
import { backdoorEffects } from '@mystical-mingles/engine/effect';

import { getClosest } from './getClosest';

interface GetTarget {
    card: CardOptionsLock<Species, ActiveParts>;
    team: Team;
    champion: Champion<Species>;
}

export function getTarget({ team, card, champion }: GetTarget) {
    if (!card.effect) { return getClosest(champion, team.alives); }

    if (backdoorEffects.includes(card.effect.name as Backdoor)) {
        if (card.effect.name === 'faster_backdoor') { return team.higherSpeed; }
    }

    return getClosest(champion, team.alives);
}