import { initializeApp } from 'firebase-admin/app';
import { onDocumentUpdated } from 'firebase-functions/v2/firestore';
import { getFirestore } from 'firebase-admin/firestore';

import type { MatchmakingData } from '@mystical-mingles/services/matchmaking';

import { DB } from '../../core';
import { initGame, getRounds, generateActions, getMatchmaking } from '../../services';

initializeApp();
const firestore = getFirestore();
const db = new DB(firestore);

export const onMatchReady = onDocumentUpdated('matchmaking/{matchId}', async (event) => {
    const before = event.data?.before.data() as MatchmakingData;
    const after = event.data?.after.data() as MatchmakingData;

    if (!before || !after) { return; };

    const matchmakingId = event.params.matchId;

    const areAllOnline = Object.keys(after.players).length === 2;
    const isReady = after.status === 'ready';
    const isWaiting = after.status === 'waiting';
    const isPending = after.status === 'pending';

    const matchmaking = await getMatchmaking({
        db,
        id: matchmakingId
    });

    const rounds = await getRounds({
        db,
        id: matchmakingId
    });

    const lastRound = rounds.reverse()[0];
    const everyoneHasAlreadyPlayed = Boolean(lastRound) && lastRound.whoHasAlreadyPlayed.length === 2;

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

    // AGUARDANDO FINAL DO TURNO
    if (areAllOnline && isPending && everyoneHasAlreadyPlayed) {
        return generateActions({
            db,
            matchmaking,
            round: lastRound
        });
    }
});