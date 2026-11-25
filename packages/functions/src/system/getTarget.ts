
import type Team from '@mystical-mingles/engine/team';
import type Champion from '@mystical-mingles/engine/champion';
import type { Species } from '@mystical-mingles/engine/species';
import type { ActiveParts } from '@mystical-mingles/engine/parts';
import type { CardOptionsLock } from '@mystical-mingles/engine/card';

import { getClosest } from './getClosest';

interface GetTarget {
    card: CardOptionsLock<Species, ActiveParts>;
    team: Team;
    champion: Champion<Species>;
}

export function getTarget({ team, card, champion }: GetTarget) {
    if (card.effect.type !== 'backdoor') { return getClosest(champion, team.alives); }

    if (card.effect.name === 'slower') { return team.lessSpeed; }
    if (card.effect.name === 'faster') { return team.higherSpeed; }
    if (card.effect.name === 'less_life') { return team.lessLife; }

    return getClosest(champion, team.alives);
}