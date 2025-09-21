import type { MatchmakingRound } from '@mystical-mingles/services/matchmaking';

import type { DB } from '../core';

type GetMatchmaking = {
    id: string;
    db: DB;
}

export function getRounds({ id, db }: GetMatchmaking) {
    return db.getSubCollection<MatchmakingRound>({
        subcollection: 'rounds',
        segments: [{ collection: 'matchmaking', doc: id }]
    });
}