import { createContext, useMemo, useRef, useState, type PropsWithChildren } from 'react';
import { useParams } from 'react-router-dom';

import { uuid } from '@mystical-mingles/toolkit/uuid';

import type Player from '@mystical-mingles/engine/player';
import type { GameOptions } from '@mystical-mingles/engine/game';

import type { Unsubscribe } from '@mystical-mingles/services/db';
import type MatchmakingServices from '@mystical-mingles/services/matchmaking';
import type { MatchmakingData, MatchmakingRound } from '@mystical-mingles/services/matchmaking';
import { toGame, toMatchmaking } from '@mystical-mingles/services/matchmaking';

export interface MatchmakingContextConfig {
    matchmaking?: MatchmakingData;
    gameOptions?: GameOptions;

    leaveRoom?: () => void;
    leaveRound?: () => void;

    getMatchMaking?: () => Promise<void>;
    createMatchmaking?: (me: Player) => Promise<void>;
    joinMatchmaking?: (roomId: string, me: Player) => Promise<void>;

    endTurn?: (me: Player, roundId: number) => Promise<void>;
    endAnimation?: (me: Player, round: MatchmakingRound) => Promise<void>;

    subscriptionMatchmaking?: (roomId: string, callback: (m: MatchmakingData) => void) => Unsubscribe;
    subscriptionRounds?: (roomId: string, callback: (m: MatchmakingRound) => void) => Unsubscribe;
}

export const MatchmakingContext = createContext<MatchmakingContextConfig>({});

export function MatchmakingProvider({
    children,
    matchmakingServices
}: PropsWithChildren<{
    matchmakingServices: MatchmakingServices;
}>) {
    const { id } = useParams<{ id: string; }>();

    const [matchmaking, setMatchmaking] = useState<MatchmakingData>();
    const [gameOptions, setGameOptions] = useState<GameOptions>();

    const unsubscribe = useRef<null | Unsubscribe>(null);
    const unsubscribeRound = useRef<null | Unsubscribe>(null);

    const context = useMemo<MatchmakingContextConfig>(() => ({
        matchmaking,
        gameOptions,

        leaveRoom: () => leaveRoom(),
        leaveRound: () => leaveRound(),

        getMatchMaking: () => getMatchMaking(),
        createMatchmaking: (me) => createMatchmaking(me),
        joinMatchmaking: (roomId, me) => joinMatchmaking(roomId, me),

        endTurn: (me, roundId) => endTurn(me, roundId),
        endAnimation: (me, round) => endAnimation(me, round),

        subscriptionRounds: (roomId, cb) => subscriptionRounds(roomId, cb),
        subscriptionMatchmaking: (roomId, cb) => subscriptionMatchmaking(roomId, cb),
    }), [id, matchmaking, gameOptions]);

    const getMatchMaking = async () => {
        if (!id) { return; }

        const matchmaking = await matchmakingServices.get(id);

        if (!matchmaking) { throw new Error('Jogo não encontrado'); }

        setMatchmaking(matchmaking);

        const rounds = await matchmakingServices.getRounds(id);

        if (!rounds.length) { throw new Error('Rounds não encontrados'); }

        const lastRound = rounds.reverse()[0];

        const players = toGame.mapPlayer(matchmaking.players, lastRound);

        setGameOptions({
            id,
            round: lastRound.id,
            priority: lastRound.priority,
            createdAt: matchmaking.createdAt.toDate(),
            players,
        });
    };

    const createMatchmaking = async (player: Player) => {
        return matchmakingServices.create({
            status: 'waiting',
            hash: uuid(),
            players: {
                [player.id]: toMatchmaking.mapTeam(player.team)
            }
        }).then(res => setMatchmaking(res));
    };

    const endAnimation = async (player: Player, round: MatchmakingRound) => {
        console.log('TERMINOU A ANINMAÇÃO');
        return matchmakingServices.finishAnimation({
            roundId: round.id,
            playerId: player.id,
            matchmakingId: id || '',
        });
    };

    const joinMatchmaking = async (roomId: string, player: Player) => {
        const matchmaking = await matchmakingServices.get(roomId);

        if (!matchmaking) { throw new Error(`A sala ${roomId} não existe`); }

        return matchmakingServices.join({
            ...matchmaking,
            players: {
                ...matchmaking.players,
                [player.id]: toMatchmaking.mapTeam(player.team)
            }
        }).then(() => setMatchmaking(matchmaking));
    };

    const endTurn = async (me: Player, roundId: number) => {
        if (!id) { return; }

        console.log(`JOGADOR ${me.id} jogou as cartas`);

        const inPlay = toMatchmaking.mapDeck(me.team.deckManager.inPlay);
        const hand = toMatchmaking.mapDeck(me.team.deckManager.hand);
        const deck = toMatchmaking.mapDeck(me.team.deckManager.deck);

        return matchmakingServices.endTurn({
            roundId: roundId,
            matchmakingId: id,
            playerId: me.id,
            energy: me.team.energyManager.energies,
            hand,
            inPlay,
            deck,
        });
    };

    const subscriptionMatchmaking = (roomId: string, callback: (m: MatchmakingData) => void) => {
        unsubscribe.current = matchmakingServices.subscribe(roomId, callback);

        return unsubscribe.current;
    };

    const subscriptionRounds = (roomId: string, callback: (m: MatchmakingRound) => void) => {
        unsubscribeRound.current = matchmakingServices.subscribeRounds(roomId, callback);

        return unsubscribeRound.current;
    };

    const leaveRoom = () => {
        if (!unsubscribe.current) { return; }

        unsubscribe.current();
        unsubscribe.current = null;

        setMatchmaking(undefined);
    };

    const leaveRound = () => {
        if (!unsubscribeRound.current) { return; }

        unsubscribeRound.current();
        unsubscribeRound.current = null;
    };

    return (
        <MatchmakingContext.Provider value={context}>
            {children}
        </MatchmakingContext.Provider>
    );
}