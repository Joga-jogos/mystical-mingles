import { uuid } from '@mystical-mingles/toolkit/uuid';

import type Card from '../card';
import type Champion from '../champion';
import type { Species } from '../species';
import type { ActiveParts } from '../parts';

import type { Deck } from './interface';

export default class DeckManager {
    private _deck: Deck;
    private _hand: Deck;
    private _death: Deck;

    constructor(champions: Champion<Species>[], deck: Deck, hand: Deck) {
        this.deck = deck || this.initHand(champions);
        this.hand = hand || this.initHand(champions);
    }

    get deck() { return this._deck; }
    private set deck(deck: Deck) { this._deck = deck; }

    get hand() { return this._hand; }
    private set hand(hand: Deck) { this._hand = hand; }

    get death() { return this._death; }
    private set death(death: Deck) { this._death = death; }

    private initHand(champions: Champion<Species>[]): Deck {
        return {
            [champions[0].id]: [],
            [champions[1].id]: [],
            [champions[2].id]: []
        };
    }

    public setHand(hand: Deck) { this.hand = hand; }

    public moveCardToHand(champion: Champion<Species>, card: Card<Species, ActiveParts>) {
        this.hand[champion.id].push(card);

        this.deck[champion.id] = this.deck[champion.id].filter(c => c.id !== card.id);
    }

    public discardHand(champion: Champion<Species>): number {
        const enegies = this.hand[champion.id].reduce((acc, card) => {
            card.id = uuid();

            this.deck[champion.id].push(card);

            acc += card.cost;

            return acc;
        }, 0);

        this.hand[champion.id] = [];

        return enegies;
    }
}