import type { Species, SpeciesOptions, SpeciesGenes, SpeciesCards, SpeciesStats, Category } from '../interface';

import { HORN_CARDS, MOUTH_CARDS, TAIL_CARDS, BACK_CARDS } from './cards';

const EYES = ['reptile eye 1', 'reptile eye 2'] as const;
const BACK = ['reptile back 1', 'reptile back 2'] as const;
const HORNS = ['reptile horn 1', 'reptile horn 2'] as const;
const TAILS = ['reptile tails 1', 'reptile tails 2'] as const;
const MOUTHS = ['reptile mounths 1', 'reptile mounths 2'] as const;

const COLORS = ['#9967fb', '#c569cf', '#f8bbff', '#5e436d', '#fff7ff'] as const;

export interface ReptileGenes {
    eye: typeof EYES[number];
    horn: typeof HORNS[number];
    tail: typeof TAILS[number];
    back: typeof BACK[number];
    mouth: typeof MOUTHS[number];
}

export type ReptileColors = typeof COLORS;

export class Reptile<
    G extends ReptileGenes,
    Colors extends ReptileColors,
    S extends Species = 'reptile'
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

export default new Reptile({
  genes: {
    eye: EYES,
    horn: HORNS,
    tail: TAILS,
    mouth: MOUTHS,
    back: BACK,
  },
  cards: {
    horn: HORN_CARDS,
    tail: TAIL_CARDS,
    back: BACK_CARDS,
    mouth: MOUTH_CARDS,
  },
  stats: {
    base: { life: 39, speed: 35, fury: 35 },
    part: { life: 3, speed: 1, fury: 0 },
  },
  category: 'tank',
  colors: [...COLORS],
  life_multiplicator: 9
});