import { getRandom } from '@mystical-mingles/toolkit/array';

import { geneParts } from '../parts';
import { species, colors, genes, type Species } from '../species';

import { generateMingleName } from './generateMingleName';
import type { MingleGenes, MingleBasicOptions } from './interface';

export function generateMingle(options: Partial<MingleBasicOptions<Species>> = {}): MingleBasicOptions<Species> {
    const chosenSpecies = getRandom(species);
    const chosenColor = getRandom(colors[chosenSpecies] as any);

    const chosenGenes = geneParts.reduce((acc, part) => {
        const currentSpecies = getRandom(species);

        acc[part] = { species: currentSpecies, name: getRandom(genes[currentSpecies][part] as string[]) };

        return acc;
    }, {}) as MingleGenes;

    return {
        name: options.name || generateMingleName(),
        genes: options.genes || chosenGenes,
        species: options.species || chosenSpecies,
        color: options.color || chosenColor as any,
        createdAt: options.createdAt || new Date(),
    };
}