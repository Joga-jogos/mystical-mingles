import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { onDocumentUpdated } from 'firebase-functions/v2/firestore';
import { logger } from 'firebase-functions';

import type { MatchmakingRound } from '@mystical-mingles/services/matchmaking';

import { DB } from '../../core';
import { generateActions, getMatchmaking, setNextRound } from '../../services';

initializeApp();
const firestore = getFirestore();
const db = new DB(firestore);

export default onDocumentUpdated('matchmaking/{matchId}/rounds/{roundId}', async (event) => {
  const before = event.data?.before.data() as MatchmakingRound;
  const after = event.data?.after.data() as MatchmakingRound;

  if (!before || !after) { return; };

  const matchmakingId = event.params.matchId;

  const isPlaying = after.status === 'playing';
  const isAnimating = after.status === 'animating';

  const everyoneHasAlreadyPlayed = after.whoHasAlreadyPlayed.length === 2;
  const everyoneHasAlreadySawAnimation = after.whoSawTheAnimation.length === 2;

  const matchmaking = await getMatchmaking({ id: matchmakingId, db });

  // GERA AS AÇÕES DO TURNO
  if (isPlaying && everyoneHasAlreadyPlayed && !everyoneHasAlreadySawAnimation) {
    logger.debug('>>> GENERATE ACTION', after.id);
    return generateActions({
      db,
      matchmaking,
      round: after,
      lastRound: before,
    });
  }

  // PREPARA PROXIMO TURNO
  if (isAnimating && everyoneHasAlreadySawAnimation) {
    logger.debug('>>> PREPARA O PROXIMO ROUND');
    return setNextRound({
      db,
      matchmaking,
      round: after,
      lastRound: before,
    });
  }
});