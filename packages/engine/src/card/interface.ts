import type { IntRange } from '@mystical-mingles/toolkit/interface';

import type { ActiveParts } from '../parts';
import type { Species, Genes } from '../species';
import type { Effect, Type, Target } from '../effect';

export type Cost = IntRange<0, 3>;
export type Attack = number;
export type Shield = number;
export type AttackType = 'ranged' | 'melee' | 'idle';

export type Assets = {
  audio: { start: string; finish: string; };
  image: { card: string; hitbox: string; };
}

export type CardEffect<E extends Effect> = { name: E; value: number; type: Type; target: Target; }

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
  type: AttackType;
  assets: Assets;
};

export interface CardOptionsLock<
  S extends Species,
  P extends ActiveParts
> extends Omit<CardOptions<S, P>, 'attack' | 'shield'> {
  attack: Attack;
  shield: Shield;
}