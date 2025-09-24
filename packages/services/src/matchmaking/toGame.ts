import Card from '@mystical-mingles/engine/card';
import Team from '@mystical-mingles/engine/team';
import Player from '@mystical-mingles/engine/player';
import Mingle from '@mystical-mingles/engine/mingle';
import Champion from '@mystical-mingles/engine/champion';
import type { Species } from '@mystical-mingles/engine/species';
import type { ActiveParts } from '@mystical-mingles/engine/parts';
import type { ChampionOptionsWithMingleOptions } from '@mystical-mingles/engine/champion';

import type { ByPlayer, MatchmakingDeck, MatchmakingPlayerData, MatchmakingRound } from './interface';

function mapDeck(champions: ChampionOptionsWithMingleOptions<Species>[], deck: MatchmakingDeck) {
    const initDeck: { [X: string]: Card<Species, ActiveParts>[] } = {
        [champions[0].mingle.id || '']: [],
        [champions[1].mingle.id || '']: [],
        [champions[2].mingle.id || '']: [],
    };

    return Object
        .entries(deck)
        .reduce((acc, [championId, cardsOptions]) => {
            acc[championId] = cardsOptions.map(options => new Card(options));

            return acc;
        }, initDeck);
};

export function mapChampions(champions: ChampionOptionsWithMingleOptions<Species>[]) {
    return champions.map(champion => {
        const { coordinates, ...options } = champion;

        return new Champion({
            coordinates,
            mingle: new Mingle({
                id: options.mingle.id,
                name: options.mingle.name,
                species: options.mingle.species,
                genes: options.mingle.genes,
                color: options.mingle.color,
                createdAt: options.mingle.createdAt,
            })
        });
    });
}

export function mapPlayer(players: ByPlayer<MatchmakingPlayerData>, round?: MatchmakingRound) {
    return Object.entries(players)
        .map(([key, player]) => {
            return new Player({
                id: key,
                team: new Team({
                    name: player.team.name,
                    energy: round ? round.players[key].energy : 3,
                    deck: mapDeck(player.team.champions, player.deck),
                    death: mapDeck(player.team.champions, round ? round.players[key].death : {}),
                    inPlay: mapDeck(player.team.champions, round ? round.players[key].inPlay : {}),
                    hand: mapDeck(player.team.champions, round ? round.players[key].hand : {}),
                    champions: mapChampions(player.team.champions),
                })
            });
        });
};