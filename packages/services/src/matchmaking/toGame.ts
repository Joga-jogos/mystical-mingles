import Card from '@mystical-mingles/engine/card';
import Team from '@mystical-mingles/engine/team';
import Player from '@mystical-mingles/engine/player';
import Mingle from '@mystical-mingles/engine/mingle';
import Champion from '@mystical-mingles/engine/champion';
import type { Species } from '@mystical-mingles/engine/species';
import type { ActiveParts } from '@mystical-mingles/engine/parts';
import type { ChampionOptionsWithMingleOptions } from '@mystical-mingles/engine/champion';

import type { ByPlayer, MatchmakingDeck, MatchmakingPlayerData, MatchmakingRound } from './interface';

export type MapPlayersOptions = {
    shouldUpdateLife?: boolean;
    shouldUpdateDeck?: boolean;
}

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
            life: options.life,
            shield: options.shield,
            buffs: options.buffs,
            debuffs: options.debuffs,
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

export function mapPlayer(
    players: ByPlayer<MatchmakingPlayerData>,
    round?: MatchmakingRound,
    options?: MapPlayersOptions,
) {
    const _options: MapPlayersOptions = {
        shouldUpdateDeck: true,
        shouldUpdateLife: true,
        ...options
    };

    const shouldUpdateDeck = _options.shouldUpdateDeck && round;

    return Object.entries(players)
        .map(([key, player]) => {
            return new Player({
                id: key,
                team: new Team({
                    name: player.team.name,
                    energy: round ? round.players[key].energy : 3,
                    deck: mapDeck(player.team.champions, player.deck),
                    death: mapDeck(player.team.champions, shouldUpdateDeck ? round.players[key].death : {}),
                    inPlay: mapDeck(player.team.champions, shouldUpdateDeck ? round.players[key].inPlay : {}),
                    hand: mapDeck(player.team.champions, shouldUpdateDeck ? round.players[key].hand : {}),
                    champions: mapChampions(
                        player.team.champions.map(champion => {
                            const championState = round && round.players[key].championsState[champion.mingle.id];

                            const shouldUpdateLife = _options && _options.shouldUpdateLife && championState;

                            const life = shouldUpdateLife
                                ? championState.life
                                : (championState?.lastLife ?? champion.life);

                            return {
                                ...champion,
                                life,
                                buffs: shouldUpdateLife ? championState.buffs : champion.buffs,
                                debuffs: shouldUpdateLife ? championState.debuffs : champion.debuffs,
                            };
                        })
                    ),
                })
            });
        });
};