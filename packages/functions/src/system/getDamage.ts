import { probably } from '@mystical-mingles/toolkit/number';

import type Card from '@mystical-mingles/engine/card';
import type Team from '@mystical-mingles/engine/team';
import type Champion from '@mystical-mingles/engine/champion';
import type { Species } from '@mystical-mingles/engine/species';
import type { ActiveParts } from '@mystical-mingles/engine/parts';
import { buffsMultiplicators } from '@mystical-mingles/engine/effect';
import { categories, interaction } from '@mystical-mingles/engine/species';

interface GetDamage {
    challangerTeam: Team;
    champion: Champion<Species>;
    target: Champion<Species>;
    card: Card<Species, ActiveParts>;
}

type Data = {
    damage: number;
    miss: boolean;
    critical: boolean;
    truedamage: boolean;
}

export function getDamage({ champion, target, card }: GetDamage): Data {
  let damage = card.attack;
  let critical = false;
  let truedamage = false;

  if (champion.debuffs.stun) {
    return { damage: 0, miss: true, critical, truedamage, };
  }

  if (champion.buffs.raise_damage) {
    damage += buffsMultiplicators.damage(card.attack) * champion.buffs.raise_damage;
  }

  if (card.species === champion.species) {
    damage += card.attack * .1;
  }

  const cardCategory = categories[card.species];
  const actorCategory = categories[champion.species];

  // Vatagem ou desvantagem da carta
  if (interaction[cardCategory].advantage === target.category) { damage += card.attack * .15; }
  if (interaction[cardCategory].disadvantage === target.category) { damage -= card.attack * .15; }

  // Vatagem ou desvantagem da espécie do atacante
  if (interaction[actorCategory].advantage === target.category) { damage += card.attack * .15; }
  if (interaction[actorCategory].disadvantage === target.category) { damage -= card.attack * .15; }

  critical = probably(champion.stats.fury / 1000);

  if (critical) { damage += card.attack * .5; }

  if (target.debuffs.stun) { truedamage = true; }

  return {
    miss: false,
    damage,
    critical,
    truedamage,
  };
}