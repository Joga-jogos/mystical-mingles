import { uuid } from '@mystical-mingles/toolkit/uuid';
import { higherThan, lessThan } from '@mystical-mingles/toolkit/array';

import type Card from '../card';
import type Champion from '../champion';
import type { Species } from '../species';
import type { ActiveParts } from '../parts';

import DeckManager from './deckManager';
import EnergyManager from './energyManager';
import type { TeamOptions } from './interface';

export default class Team {
  public id: string;
  public name: string;

  public champions: Champion<Species>[] = [];

  public deckManager: DeckManager;
  public energyManager: EnergyManager;

  constructor({ champions, deck, hand, death, inPlay, energy, name, id }: TeamOptions) {
    this.name = name || this.name;

    this.id = id || uuid();
    this.champions = champions || this.champions;

    this.energyManager = new EnergyManager(energy ?? 3);
    this.deckManager = new DeckManager(champions, { death, deck, hand, inPlay });

    this.init();
  }

  get alives() { return this.champions.filter((champion) => champion.isAlive); }

  get higherLife() { return higherThan(this.alives, 'stats.life'); }
  get higherSpeed() { return higherThan(this.alives, 'stats.speed'); }

  get lessLife() { return lessThan(this.alives, 'stats.life'); }
  get lessSpeed() { return lessThan(this.alives, 'stats.speed'); }

  private init() {
    Object.entries(this.deckManager.inPlay).map(([championId, cards]) => {
      const champion = this.champions.find(champion => champion.id === championId);

      if (!champion) { return; }

      champion.shield = cards.reduce((acc, card) => acc += card.shield, 0);
    });
  }

  public playCard(card: Card<Species, ActiveParts>, champion: Champion<Species>) {
    const hasValidCost = (this.energyManager.energies - card.cost) >= 0;

    if (!hasValidCost) { return; }

    this.deckManager.moveCardToInPlay(champion, card);

    champion.shield += card.shield;

    this.energyManager.spend(card.cost);
  }

  public resetHand(champion: Champion<Species>) {
    const enegies = this.deckManager.discardInPlay(champion);

    champion.shield = 0;

    this.energyManager.recover(enegies);
  }
}
