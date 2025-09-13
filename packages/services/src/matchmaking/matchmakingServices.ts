import { Timestamp } from 'firebase/firestore';

import { uuid } from '@mystical-mingles/toolkit/uuid';

import type DB from '../db';

import type { MatchmakingData } from './interface';

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
            data: data,
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
}