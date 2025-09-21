import type Team from '@mystical-mingles/engine/team';
import type Champion from '@mystical-mingles/engine/champion';
import type { Species } from '@mystical-mingles/engine/species';
import type { Deck } from '@mystical-mingles/engine/team';

import type { MatchmakingDeck, MatchmakingPlayerData } from '@mystical-mingles/services/matchmaking';

export function mapDeck(champions: Champion<Species>[]) {
    return champions
        .reduce<MatchmakingDeck>((acc, champion) => {
            acc[champion.id] = [
                champion.cards.back.options,
                champion.cards.horn.options,
                champion.cards.mouth.options,
                champion.cards.tail.options,
            ];

            return acc;
        }, Object.fromEntries(champions.map(c => [c.id, []])));
};

export function mapHand(deck: Deck) {
    return Object.fromEntries(
        Object.entries(deck)
            .map(([championId, cards]) => [
                championId,
                cards.map(card => card.options),
            ])
    );
}

export function mapTeam(team: Team): MatchmakingPlayerData {
    return {
        team: {
            name: team.name,
            champions: team.champions.map(champion => champion.options)
        },
        deck: mapDeck(team.champions)
    };
};
