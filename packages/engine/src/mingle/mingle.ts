import { uuid } from '@mystical-mingles/toolkit/uuid';

import type Card from '../card';
import type { ActiveParts, GeneParts, Stats, } from '../parts';
import type { Category, Species, SpeciesDetailsMap } from '../species';
import { categories, speciesMap } from '../species';

import type { MingleColor, MingleGenes, MingleOptions, MingleBasicOptions, MingleCards } from './interface';

type CardName<S extends Species, A extends ActiveParts> = SpeciesDetailsMap[S]['cards'][A][number]['name'];
type MapCard<S extends Species> = { [A in ActiveParts]: { species: S; name: CardName<S, A>; } };

function pickSpecieStats<S extends Species>(species: S): SpeciesDetailsMap[S]['stats'] {
  return speciesMap[species].stats;
};

function pickSpeciesCards<S extends Species>(species: S): SpeciesDetailsMap[S]['cards'] {
  return speciesMap[species].cards;
};

function pickCard<
    S extends Species,
    A extends ActiveParts,
    C extends CardName<S, A>
>(cards: Card<S, A>[], name: C) {
  const card = cards.find(card => card.name === name);

  if (!card) { throw new Error(`Card ${name} not found`); }

  return card;
}

export default class Mingle<S extends Species> implements MingleOptions<S> {
  public id: string;

  public name: string;
  public createdAt = new Date();

  public species: S;
  public stats: Stats;
  public genes: MingleGenes;
  public category: Category;
  public color: MingleColor<S>;
  public cards: MingleCards;

  constructor({ id, name, species, genes, color, createdAt }: MingleBasicOptions<S>) {
    this.id = id || uuid();
    this.genes = genes;
    this.name = name;
    this.color = color;
    this.species = species;
    this.category = categories[species];
    this.createdAt = createdAt || new Date();

    this.stats = this.setStats({
      species: this.species,
      eye: this.genes.eye.species,
      horn: this.genes.horn.species,
      tail: this.genes.tail.species,
      mouth: this.genes.mouth.species,
      back: this.genes.back.species,
    });

    this.cards = this.setCards({
      horn: this.genes.horn,
      tail: this.genes.tail,
      mouth: this.genes.mouth,
      back: this.genes.back,
    });
  }

  private setStats({
    eye,
    horn,
    mouth,
    tail,
    species,
    back
  }: { [G in GeneParts]: Species } & { species: Species }) {
    const stats: Stats = { life: 0, speed: 0, fury: 0 };

    const geneParts = { eye, horn, tail, mouth, back };

    const baseStats = pickSpecieStats(species);

    stats.life += baseStats.base.life;
    stats.fury += baseStats.base.fury;
    stats.speed += baseStats.base.speed;

    for (const part in geneParts) {
      const partStats = pickSpecieStats(geneParts[part]);

      stats.fury += partStats.part.fury;
      stats.speed += partStats.part.speed;
      stats.life += partStats.part.life;
    }

    return {
      fury: Math.round(stats.fury),
      speed: Math.round(stats.speed),
      life: Math.round(stats.life),
    };
  }

  private setCards<S extends Species, Data extends MapCard<S>>({
    horn,
    mouth,
    tail,
    back
  }: Data) {
    const [hornSpeciesCards, tailSpeciesCards, backSpeciesCards, mouthSpeciesCards] = [
      pickSpeciesCards(horn.species),
      pickSpeciesCards(tail.species),
      pickSpeciesCards(back.species),
      pickSpeciesCards(mouth.species),
    ];

    return {
      horn: pickCard(hornSpeciesCards.horn, horn.name),
      tail: pickCard(tailSpeciesCards.tail, tail.name),
      back: pickCard(backSpeciesCards.back, back.name),
      mouth: pickCard(mouthSpeciesCards.mouth, mouth.name),
    };
  }
}
