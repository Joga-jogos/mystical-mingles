import type Player from '@mystical-mingles/engine/player';
import type Champion from '@mystical-mingles/engine/champion';
import type { Species } from '@mystical-mingles/engine/species';
import type { ActiveParts } from '@mystical-mingles/engine/parts';
import type { CardOptionsLock } from '@mystical-mingles/engine/card';

import { getTarget } from './getTarget';
import { getDamage } from './getDamage';

type GetAction = {
    me: Player;
    challenger: Player;
    champion: Champion<Species>;
    target: Champion<Species>;
    cardOptions: CardOptionsLock<Species, ActiveParts>;
}

export function getAction({
    me,
    champion,
    target,
    challenger,
    cardOptions,
}: GetAction) {
    const card = me.team.deckManager.inPlay[champion.id]
        .find(card => card.name === cardOptions.name);
    // const isMelee = card.type === 'melee';

    // INICIAR CALCULO DE DANO
    const { critical, damage, miss, truedamage } = getDamage({
        champion,
        target,
        card,
        challangerTeam: challenger.team
    });

    if (truedamage) { target.takeTrueDamage(damage); }
    if (!truedamage) { target.takeDamage(damage); }

    return {
        type: card.type,
        actor: champion.options,
        target: target.options,
        critical,
        damage,
        miss,
        truedamage,
    };
}