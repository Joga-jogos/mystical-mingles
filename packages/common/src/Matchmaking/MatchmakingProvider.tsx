import { createContext, useMemo, useState, type PropsWithChildren } from 'react';
import { useNavigate, generatePath } from 'react-router-dom';

import Team from '@mystical-mingles/engine/team';
import Player from '@mystical-mingles/engine/player';
import Mingle from '@mystical-mingles/engine/mingle';
import Champion from '@mystical-mingles/engine/champion';
import type { GameOptions } from '@mystical-mingles/engine/game';

import type { Unsubscribe } from '@mystical-mingles/services/db';
import type { MatchmakingData, MatchmakingDeck, MatchmakingPlayerData } from '@mystical-mingles/services/matchmaking';
import type MatchmakingServices from '@mystical-mingles/services/matchmaking';
import { PlayerData } from '@mystical-mingles/services/matchmaking';

export interface MatchmakingContextConfig {
    matchmaking?: MatchmakingData;
    gameOptions?: GameOptions;

    getMatchMaking?: (id: string) => Promise<void>;

    createMatchmaking?: (player: Player) => Promise<void>;
    joinMatchmaking?: (roomId: string, player: Player) => Promise<void>;

    subscriptionMatchmaking?: (roomId: string) => Unsubscribe;
}

export const MatchmakingContext = createContext<MatchmakingContextConfig>({});

export function MatchmakingProvider({
    children,
    matchmakingServices
}: PropsWithChildren<{
    matchmakingServices: MatchmakingServices;
}>) {
    const navigate = useNavigate();

    const [matchmaking, setMatchmaking] = useState<MatchmakingData>();
    const [gameOptions, setGameOptions] = useState<GameOptions>();

    const context = useMemo<MatchmakingContextConfig>(() => ({
        matchmaking,
        gameOptions,

        getMatchMaking: (roomId) => getMatchMaking(roomId),

        createMatchmaking: (player) => createMatchmaking(player),
        joinMatchmaking: (roomId, player) => joinMatchmaking(roomId, player),

        subscriptionMatchmaking: (roomId) => subscriptionMatchmaking(roomId),
    }), [matchmaking, gameOptions]);

    const goToGame = (roomId: string) => {
        navigate(generatePath('/game/:id', { id: roomId }));
    };

    const map = (players: PlayerData<MatchmakingPlayerData>) => {
        return Object.entries(players)
            .map(([key, player]) => {
                return new Player({
                    id: key,
                    team: new Team({
                        name: player.team.name,
                        champions: player.team.champions.map(champion => {
                            const { coordinates, ...options } = champion;

                            return new Champion({
                                coordinates,
                                mingle: new Mingle({
                                    name: options.mingle.name,
                                    species: options.mingle.species,
                                    genes: options.mingle.genes,
                                    color: options.mingle.color,
                                    createdAt: options.mingle.createdAt,
                                })
                            });
                        })
                    })
                });
            });
    };

    const getMatchMaking = async (id: string) => {
        return matchmakingServices.get(id)
            .then(res => {
                if (!res) { throw new Error('Jogo não encontrado'); }

                setGameOptions({
                    id,
                    round: 1,
                    createdAt: res.createdAt.toDate(),
                    players: map(res.players)
                });
            });
    };

    const mapPlayerDeck = (player: Player): MatchmakingPlayerData => {
        return {
            team: {
                name: player.team.name,
                champions: player.team.champions.map(champion => champion.options)
            },
            deck: player.team.champions
                .reduce<MatchmakingDeck>((acc, champion) => {
                    acc[champion.id] = [
                        champion.cards.back.options,
                        champion.cards.horn.options,
                        champion.cards.mouth.options,
                        champion.cards.tail.options,
                    ];

                    return acc;
                }, {
                    [player.team.champions[0].id]: [],
                    [player.team.champions[1].id]: [],
                    [player.team.champions[2].id]: [],
                })
        };
    };

    const createMatchmaking = async (player: Player) => {
        return matchmakingServices.create({
            rounds: [],
            players: {
                [player.id]: mapPlayerDeck(player)
            }
        }).then(res => setMatchmaking(res));
    };

    const joinMatchmaking = async (roomId: string, player: Player) => {
        const matchmaking = await matchmakingServices.get(roomId);

        if (!matchmaking) { throw new Error(`A sala ${roomId} não existe`); }

        return matchmakingServices.join({
            ...matchmaking,
            players: {
                ...matchmaking.players,
                [player.id]: mapPlayerDeck(player)
            }
        }).then(() => goToGame(roomId));
    };

    const subscriptionMatchmaking = (roomId: string) => {
        return matchmakingServices.subscribe(roomId, (matchmaking) => {
            if (Object.keys(matchmaking.players).length < 2) { return; }

            goToGame(roomId);
        });
    };

    return (
        <MatchmakingContext.Provider value={context}>
            {children}
        </MatchmakingContext.Provider>
    );
}