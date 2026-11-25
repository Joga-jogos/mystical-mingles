import type Player from '@mystical-mingles/engine/player';
import type Champion from '@mystical-mingles/engine/champion';
import type { Species } from '@mystical-mingles/engine/species';
import type { ActiveParts } from '@mystical-mingles/engine/parts';
import type { CardOptionsLock } from '@mystical-mingles/engine/card';

import type { MatchmakingAction } from '@mystical-mingles/services/matchmaking';

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
}: GetAction): MatchmakingAction {
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

  if (card.effect.target === 'self') {
    if (card.effect.type === 'buff') {
      champion.applyBuff(card.effect.name, card.effect.value);
    }
  }

  // if (card.effect.target === 'target') {

  // }

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