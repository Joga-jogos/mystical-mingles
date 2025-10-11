import { arrayUnion, Timestamp } from 'firebase/firestore';

import { uuid } from '@mystical-mingles/toolkit/uuid';

import type DB from '../db';

import type { MatchmakingData, MatchmakingDeck, MatchmakingRound } from './interface';

export default class MatchmakingServices {
    private static PATH = 'matchmaking';

    constructor(private db: DB) { }

    async get(roomId: string) {
        return this.db.getItem<MatchmakingData>({
            path: MatchmakingServices.PATH,
            pathSegments: [],
            filters: [{ field: 'id', operator: '==', value: roomId }]
        });
    }

    async getRounds(roomId: string) {
        return this.db.getList<MatchmakingRound>({
            path: MatchmakingServices.PATH,
            pathSegments: [roomId, 'rounds'],
            filters: []
        });
    }

    async finishAnimation(data: {
        roundId: number,
        playerId: string,
        matchmakingId: string,
    }) {
        const { roundId, playerId, matchmakingId, } = data;

        return this.db.update({
            path: MatchmakingServices.PATH,
            pathSegments: [matchmakingId, 'rounds', `Round${roundId}`],
            data: {
                whoSawTheAnimation: arrayUnion(playerId),
            }
        });
    }

    async endTurn(data: {
        roundId: number,
        playerId: string,
        matchmakingId: string,
        energy: number;
        hand: MatchmakingDeck;
        inPlay: MatchmakingDeck;
        deck: MatchmakingDeck;
    }) {
        const { roundId, playerId, matchmakingId, hand, inPlay, deck, energy } = data;

        const path = `players.${playerId}`;

        await this.db.update({
            path: MatchmakingServices.PATH,
            pathSegments: [matchmakingId, 'rounds', `Round${roundId}`],
            data: {
                [`${path}.hand`]: hand,
                [`${path}.deck`]: deck,
                [`${path}.inPlay`]: inPlay,
                [`${path}.energy`]: energy,
                whoHasAlreadyPlayed: arrayUnion(playerId),
            }
        });
    }

    async create(data: Omit<MatchmakingData, 'id' | 'createdAt'>) {
        const id = uuid();

        const newMatchmaking: MatchmakingData = {
            ...data,
            id,
            createdAt: Timestamp.fromDate(new Date()),
        };

        return this.db.setItem<MatchmakingData>({
            data: newMatchmaking,
            path: MatchmakingServices.PATH,
            pathSegments: [id]
        }).then(() => newMatchmaking);
    }

    async join(data: MatchmakingData) {
        return this.db.setItem<MatchmakingData>({
            data,
            path: MatchmakingServices.PATH,
            pathSegments: [data.id]
        });
    }

    subscribe(roomId: string, callback: (data: MatchmakingData) => void) {
        return this.db.subscribe<MatchmakingData>({
            path: MatchmakingServices.PATH,
            pathSegments: [],
            filters: [{ field: 'id', operator: '==', value: roomId }]
        }, callback);
    }

    subscribeRounds(roomId: string, callback: (data: MatchmakingRound) => void) {
        return this.db.subscribe<MatchmakingRound>({
            path: MatchmakingServices.PATH,
            pathSegments: [roomId, 'rounds'],
            filters: []
        }, callback);
    }
}