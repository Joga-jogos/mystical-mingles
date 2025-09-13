import type { IntRange } from '@mystical-mingles/toolkit/interface';

import type Mingle from '../mingle';
import type { Species } from '../species';
import type { MingleOptions } from '../mingle';
import type { Buff, Debuff, BuffAndDebuff } from '../effect';

export type Coordinates = { x: IntRange<0, 6>; y: IntRange<0, 4>; };
export type SetOfEffects<E extends BuffAndDebuff> = Partial<{ [key in E]: number; }>

export interface ChampionOptions extends MingleOptions<Species> {
    id?: string;
    life?: number;
    shield?: number;
    buffs?: SetOfEffects<Buff>;
    debuffs?: SetOfEffects<Debuff>;
    coordinates: Coordinates;
}

export interface ChampionBaseOptions<S extends Species> extends Pick<
    ChampionOptions,
    | 'life'
    | 'buffs'
    | 'shield'
    | 'debuffs'
    | 'coordinates'
> {
    mingle: Mingle<S>
}

export interface ChampionOptionsWithMingleOptions<S extends Species> extends Pick<
    ChampionOptions,
    | 'life'
    | 'buffs'
    | 'shield'
    | 'debuffs'
    | 'coordinates'
> {
    mingle: Omit<MingleOptions<S>, 'cards'>;
}