import type { MatchmakingData } from '@mystical-mingles/services/matchmaking';

import type { DB } from '../core';

type GetMatchmaking = {
    id: string;
    db: DB;
}

export function getMatchmaking({ id, db }: GetMatchmaking) {
  return db.getCollection<MatchmakingData>({
    segments: [{ collection: 'matchmaking', doc: id }]
  });
}