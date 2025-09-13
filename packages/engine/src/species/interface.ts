import type Card from '../card';
import type { GeneParts, ActiveParts, Stats } from '../parts';

import type { Bird, BirdGenes, BirdColors } from './bird';
import type { Fish, FishGenes, FishColors } from './fish';

export type Category = 'dps' | 'speed' | 'tank';

export type Species = 'fish' | 'bird';

export type SpeciesGenesParts = { [Key in GeneParts]: string; };

export type SpeciesColors = readonly string[];
export type SpeciesStats = { base: Stats; part: Stats; }
export type SpeciesCards<S extends Species> = { [Key in ActiveParts]: Card<S, Key>[]; };
export type SpeciesGenes<SGP extends SpeciesGenesParts> = { [Key in GeneParts]: readonly SGP[Key][]; };

export interface SpeciesOptions<S extends Species, SGP extends SpeciesGenesParts, Colors extends SpeciesColors> {
    readonly colors: Colors;
    readonly category: Category;
    readonly stats: SpeciesStats;
    readonly cards: SpeciesCards<S>;
    readonly genes: SpeciesGenes<SGP>;
    readonly life_multiplicator: number;
}

export type SpeciesDetailsMap = {
    bird: Bird<BirdGenes, BirdColors, 'bird'>;
    fish: Fish<FishGenes, FishColors, 'fish'>;
};

export type SpeciesDetails<S extends Species> = SpeciesDetailsMap[S];