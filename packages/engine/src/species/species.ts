import type { GeneParts } from '../parts';

import reptile from './reptile';
import fish from './fish';
import type {
  Species,
  Category,
  SpeciesDetailsMap,
} from './interface';

export type Genes = typeof genes;

export type ItemGene = { gene: GeneParts; name: string; species: Species };

export const species: Species[] = ['reptile', 'fish'];

export const speciesMap: SpeciesDetailsMap = {
  reptile,
  fish,
};

function mapSpecies<
    S extends Species,
    K extends keyof typeof speciesMap[S],
    R extends SpeciesDetailsMap[S][K]
>(key: K): { [X in S]: R } {
  const speciesList: Species[] = species;

  const result = {} as { [X in S]: R };

  speciesList.forEach(s => {
    result[s] = speciesMap[s as unknown as any][key];
  });

  return result;
};

export const cards = mapSpecies('cards');
export const genes = mapSpecies('genes');
export const colors = mapSpecies('colors');
export const modificators = mapSpecies('life_multiplicator');
export const categories = mapSpecies('category');

export const interaction: { [C in Category]: { advantage: Category; disadvantage: Category; } } = {
  dps: { advantage: 'tank', disadvantage: 'speed' },
  tank: { advantage: 'speed', disadvantage: 'dps' },
  speed: { advantage: 'dps', disadvantage: 'tank' },
};

export const listGenes: ItemGene[] = Object.keys(genes)
  .map((species) => ({ species, genes: genes[species as Species] }))
  .reduce<any[]>((acc, current) => {
    Object.keys(current.genes)
      .forEach((gene) => {
        current.genes[gene as GeneParts]
          .forEach((name) => {
            acc.push({ gene, name, species: current.species });
          });
      });
    return acc;
  }, []);