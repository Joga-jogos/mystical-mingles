import type { Species, SpeciesOptions, SpeciesGenes, SpeciesCards, SpeciesStats, Category } from '../interface';

import { HORN_CARDS, MOUTH_CARDS, TAIL_CARDS, BACK_CARDS } from './cards';

const EYES = ['fish eye 1', 'fish eye 2'] as const;
const BACK = ['fish back 1', 'fish back 2'] as const;
const HORNS = ['fish horn 1', 'fish horn 2'] as const;
const TAILS = ['fish tails 1', 'fish tails 2'] as const;
const MOUTHS = ['fish mounths 1', 'fish mounths 2'] as const;

const COLORS = ['#00b8ff', '#00dff3', '#00f1d2', '#4d545e', '#f4fff4'] as const;

export interface FishGenes {
    eye: typeof EYES[number];
    back: typeof BACK[number];
    horn: typeof HORNS[number];
    tail: typeof TAILS[number];
    mouth: typeof MOUTHS[number];
}

export type FishColors = typeof COLORS;

export class Fish<
    G extends FishGenes,
    Colors extends FishColors,
    S extends Species = 'fish'
> implements SpeciesOptions<S, G, Colors> {
  public readonly colors: Colors;
  public readonly category: Category;
  public readonly stats: SpeciesStats;
  public readonly genes: SpeciesGenes<G>;
  public readonly cards: SpeciesCards<S>;
  public readonly life_multiplicator: number;

  constructor({ genes: parts, cards, colors, stats, category, life_multiplicator }: SpeciesOptions<S, G, Colors>) {
    this.genes = parts;
    this.cards = cards;
    this.stats = stats;
    this.colors = colors;
    this.category = category;
    this.life_multiplicator = life_multiplicator;
  }
}

export default new Fish({
  genes: {
    eye: EYES,
    horn: HORNS,
    tail: TAILS,
    back: BACK,
    mouth: MOUTHS,
  },
  cards: {
    horn: HORN_CARDS,
    tail: TAIL_CARDS,
    back: BACK_CARDS,
    mouth: MOUTH_CARDS,
  },
  stats: {
    base: { life: 39, speed: 39, fury: 27 },
    part: { life: 1, speed: 3, fury: 0 },
  },
  category: 'speed',
  colors: [...COLORS],
  life_multiplicator: 10
});