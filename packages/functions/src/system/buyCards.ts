import { uuid } from '@mystical-mingles/toolkit/uuid';
import { getFilledArray, getRandom } from '@mystical-mingles/toolkit/array';

import type { Deck } from '@mystical-mingles/engine/team';
import type { Species } from '@mystical-mingles/engine/species';
import type { ChampionOptionsWithMingleOptions } from '@mystical-mingles/engine/champion';

import type { MatchmakingDeck } from '@mystical-mingles/services/matchmaking';

interface BuyCardsOptions {
    count: number;
    champions: ChampionOptionsWithMingleOptions<Species>[];
    deck: MatchmakingDeck;
    hand?: MatchmakingDeck;
}

function initHand(champions: ChampionOptionsWithMingleOptions<Species>[]): Deck {
    return {
        [champions[0].mingle.id]: [],
        [champions[1].mingle.id]: [],
        [champions[2].mingle.id]: []
    };
}

function getValidCard(
    champions: ChampionOptionsWithMingleOptions<Species>[],
    currentDeck: MatchmakingDeck,
    deck: MatchmakingDeck
) {
    const pickedChampion = getRandom(champions);
    const championDeck = currentDeck[pickedChampion.mingle.id];

    // se campeão cheio, tenta outro
    if (championDeck.length >= 8) {
        const withoutCurrent = champions.filter(c => c.mingle.id !== pickedChampion.mingle.id);
        if (withoutCurrent.length === 0) throw new Error('Todos os campeões estão cheios');

        return getValidCard(withoutCurrent, currentDeck, deck);
    }

    const pickedCard = { ...getRandom(deck[pickedChampion.mingle.id]), id: uuid() };

    const existingCount = championDeck.filter(c => c.name === pickedCard.name).length;

    // não pode ter mais de 2 iguais
    if (existingCount >= 2) {
        return getValidCard(champions, currentDeck, deck);
    }

    return { pickedChampion, pickedCard };
}

export function buyCards({
    deck,
    count,
    champions,
    hand
}: BuyCardsOptions): MatchmakingDeck {
    const acc = hand || initHand(champions);

    return getFilledArray(count).reduce((deckAcc) => {
        const { pickedChampion, pickedCard } = getValidCard(champions, deckAcc, deck);

        deckAcc[pickedChampion.mingle.id] = [...deckAcc[pickedChampion.mingle.id], pickedCard];

        return deckAcc;
    }, acc);
}