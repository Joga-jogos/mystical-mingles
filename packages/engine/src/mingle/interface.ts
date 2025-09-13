import type { ActiveParts, GeneParts, Stats } from '../parts';
import type { Category, Species, SpeciesCards, SpeciesDetails } from '../species';

export type MingleCards = {
    [A in ActiveParts]: SpeciesCards<Species>[A][number];
};

export type MingleColor<S extends Species> = SpeciesDetails<S>['colors'][number];

export type MingleGenes = {
    [S in Species]: {
        [G in GeneParts]: {
            species: S;
            name: SpeciesDetails<S>['genes'][G][number];
        };
    }
}[Species];

export type MingleOptions<S extends Species> = {
    id?: string;
    name: string;
    species: S;
    stats: Stats;
    genes: MingleGenes;
    cards: MingleCards;
    category: Category;
    color: MingleColor<S>;
    createdAt: Date;
};

export type MingleBasicOptions<S extends Species> = {
    [A in S]: Pick<
        MingleOptions<A>,
        | 'id'
        | 'name'
        | 'species'
        | 'genes'
        | 'createdAt'
    > & { color: MingleColor<S>; };
}[S];