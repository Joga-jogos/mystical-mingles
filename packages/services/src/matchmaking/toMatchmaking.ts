import type Team from '@mystical-mingles/engine/team';
import type Player from '@mystical-mingles/engine/player';
import type { Deck } from '@mystical-mingles/engine/team';

import type {
    ByPlayer,
    MatchmakingDeck,
    MatchmakingPlayerData,
    MatchMakingRoundPlayer
} from '@mystical-mingles/services/matchmaking';

export function mapDeck(deck: Deck) {
    return Object.entries(deck)
        .reduce<MatchmakingDeck>((acc, [championId, cards]) => {
            acc[championId] = cards.map(card => card.options)
                .filter(Boolean);

            return acc;
        }, {});
};

export function mapTeam(team: Team): MatchmakingPlayerData {
    return {
        team: {
            name: team.name,
            champions: team.champions.map(champion => champion.options)
        },
        deck: mapDeck(team.deckManager.deck)
    };
};

export function mapPlayerRound(players: Player[]) {
    return players.reduce<ByPlayer<MatchMakingRoundPlayer>>((acc, player) => {
        acc[player.id] = {
            championsState: {},
            energy: player.team.energyManager.energies,
            deck: mapDeck(player.team.deckManager.deck),
            hand: mapDeck(player.team.deckManager.hand),
            death: mapDeck(player.team.deckManager.death),
            inPlay: mapDeck(player.team.deckManager.inPlay),
        };

        return acc;
    }, {});
}