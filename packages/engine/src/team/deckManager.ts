import { uuid } from '@mystical-mingles/toolkit/uuid';
import { getFilledArray, getRandom } from '@mystical-mingles/toolkit/array';

import type Card from '../card';
import type Champion from '../champion';
import type { Species } from '../species';
import { type ActiveParts, activeParts } from '../parts';

import type { Deck } from './interface';

export default class DeckManager {
    private _deck: Deck;
    private _hand: Deck;
    private _death: Deck;

    constructor(champions: Champion<Species>[], deck: Deck, hand: Deck) {
        this.deck = deck || this.initHand(champions);
        this.hand = hand || this.initHand(champions);

        if (deck) { return; }

        this.initDeck(champions);
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

    private initDeck(champions: Champion<Species>[]) {
        if (champions.length !== 3) { return; }

        this.deck = this.buyCards(champions, 6);
    }

    private getValidCard(champions: Champion<Species>[], currentDeck: Deck) {
        const pickedChampion = getRandom(champions);
        const championDeck = currentDeck[pickedChampion.id];

        // se campeão cheio, tenta outro
        if (championDeck.length >= 8) {
            const withoutCurrent = champions.filter(c => c.id !== pickedChampion.id);
            if (withoutCurrent.length === 0) throw new Error('Todos os campeões estão cheios');
            return this.getValidCard(withoutCurrent, currentDeck);
        }

        const pickedPart = getRandom(activeParts);
        const pickedCard = { ...pickedChampion.cards[pickedPart], id: uuid() };

        const existingCount = championDeck.filter(c => c.name === pickedCard.name).length;

        // não pode ter mais de 2 iguais
        if (existingCount >= 2) {
            return this.getValidCard(champions, currentDeck);
        }

        return { pickedChampion, pickedCard };
    }

    public buyCards(champions: Champion<Species>[], count: number): Deck {
        const acc = this.initHand(champions);

        return getFilledArray(count).reduce((deckAcc) => {
            const { pickedChampion, pickedCard } = this.getValidCard(champions, deckAcc);

            deckAcc[pickedChampion.id] = [...deckAcc[pickedChampion.id], pickedCard];

            return deckAcc;
        }, acc);
    }

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