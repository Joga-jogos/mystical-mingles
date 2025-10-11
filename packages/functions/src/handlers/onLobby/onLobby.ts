import { initializeApp } from 'firebase-admin/app';
import { onDocumentUpdated } from 'firebase-functions/v2/firestore';
import { getFirestore } from 'firebase-admin/firestore';

import type { MatchmakingData } from '@mystical-mingles/services/matchmaking';

import { DB } from '../../core';
import { initGame } from '../../services/initGame';

initializeApp();
const firestore = getFirestore();
const db = new DB(firestore);

export default onDocumentUpdated('matchmaking/{matchId}', async (event) => {
    const before = event.data?.before.data() as MatchmakingData;
    const after = event.data?.after.data() as MatchmakingData;

    if (!before || !after) { return; };

    const matchmakingId = event.params.matchId;

    const areAllOnline = Object.keys(after.players).length === 2;
    const isReady = after.status === 'ready';
    const isWaiting = after.status === 'waiting';

    // ESPERANDO TODOS OS JOGADORES
    if (!areAllOnline) { return; }

    // TURNO EM ANDAMENTO
    if (areAllOnline && isReady) { return; }

    // INICIA O JOGO
    if (areAllOnline && isWaiting) {
        return initGame({
            db,
            id: matchmakingId,
            matchmaking: after,
        });
    }
});