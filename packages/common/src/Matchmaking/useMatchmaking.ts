import { useContext } from 'react';

import { MatchmakingContext } from './MatchmakingProvider';

export function useMatchmaking() {
  return useContext(MatchmakingContext);
}