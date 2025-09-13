import type { IntRange } from '@mystical-mingles/toolkit/interface';

import type { Effect } from '../effect';
import type { ActiveParts } from '../parts';
import type { Species, Genes } from '../species';

export type Cost = IntRange<0, 3>;
export type Attack = number;
export type Shield = number;
export type Type = 'ranged' | 'melee';

export type Assets = {
  audio: { start: string; finish: string; };
  image: { card: string; hitbox: string; };
}

export type CardEffect<E extends Effect> = { name: E; value: number; }

export type CardOptions<S extends Species, P extends ActiveParts> = {
  id?: string;
  attack: number;
  shield: number;
  description: string;
  part: P;
  cost: Cost;
  species: S;
  effect?: CardEffect<Effect>;
  name: Genes[S][P][number];
  type: Type;
  assets: Assets;
};

export interface CardOptionsLock<
  S extends Species,
  P extends ActiveParts
> extends Omit<CardOptions<S, P>, 'attack' | 'shield'> {
  attack: Attack;
  shield: Shield;
}