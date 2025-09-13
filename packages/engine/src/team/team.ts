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

    private deckManager: DeckManager;
    private energyManager: EnergyManager;

    constructor({ champions, deck, hand, energy, name, id }: TeamOptions) {
        this.name = name || this.name;

        this.id = id || uuid();
        this.champions = champions || this.champions;

        this.energyManager = new EnergyManager(energy || 3);
        this.deckManager = new DeckManager(champions, deck, hand);
    }

    get energies() { return this.energyManager.energies; }

    get deck() { return this.deckManager.deck; }
    get hand() { return this.deckManager.hand; }

    get alives() { return this.champions.filter((champion) => champion.isAlive); }

    get priorityOrder() {
        return this.champions.sort((a, b) => {
            return a.stats.speed > b.stats.speed ? -1 : 1;
        }).filter((ally) => ally.isAlive);
    }

    get higherLife() { return higherThan(this.alives, 'stats.life'); }
    get higherSpeed() { return higherThan(this.alives, 'stats.speed'); }

    get lessLife() { return lessThan(this.alives, 'stats.life'); }
    get lessSpeed() { return lessThan(this.alives, 'stats.speed'); }

    public playCard(card: Card<Species, ActiveParts>, champion: Champion<Species>) {
        const hasValidCost = (this.energyManager.energies - card.cost) >= 0;

        if (!hasValidCost) { return; }

        this.deckManager.moveCardToHand(champion, card);

        this.energyManager.spend(card.cost);
    }

    public resetHand(champion: Champion<Species>) {
        const enegies = this.deckManager.discardHand(champion);

        this.energyManager.recover(enegies);
    }
}
