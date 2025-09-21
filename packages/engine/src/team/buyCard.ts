import { uuid } from '@mystical-mingles/toolkit/uuid';
import { getFilledArray, getRandom } from '@mystical-mingles/toolkit/array';

import Champion from '../champion';
import { Species } from '../species';
import { activeParts } from '../parts';

import type { Deck } from './interface';

function initHand(champions: Champion<Species>[]): Deck {
    return {
        [champions[0].id]: [],
        [champions[1].id]: [],
        [champions[2].id]: []
    };
}

function getValidCard(champions: Champion<Species>[], currentDeck: Deck) {
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

export function buyCards(champions: Champion<Species>[], count: number, deck?: Deck): Deck {
    const acc = deck || initHand(champions);

    return getFilledArray(count).reduce((deckAcc) => {
        const { pickedChampion, pickedCard } = getValidCard(champions, deckAcc);

        deckAcc[pickedChampion.id] = [...deckAcc[pickedChampion.id], pickedCard];

        return deckAcc;
    }, acc);
}