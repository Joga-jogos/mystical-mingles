import type { Timestamp } from 'firebase/firestore';

import type { Species } from '@mystical-mingles/engine/species';
import type { ActiveParts } from '@mystical-mingles/engine/parts';
import type { CardOptionsLock } from '@mystical-mingles/engine/card';
import type { ChampionOptionsWithMingleOptions } from '@mystical-mingles/engine/champion';

export type PlayerData<T> = {
    [playerId: string]: T
}

export interface MatchmakingData {
    id: string;
    createdAt: Timestamp;
    players: PlayerData<MatchmakingPlayerData>;
    rounds: MatchmakingRound[];
}

export interface MatchmakingPlayerData {
    team: MatchmakingTeam;
    deck: MatchmakingDeck;
}

export interface MatchmakingTeam {
    name: string;
    champions: ChampionOptionsWithMingleOptions<Species>[];
}

export interface MatchmakingRound {
    id: number;
    hand: PlayerData<MatchmakingDeck>;
    deck: PlayerData<MatchmakingDeck>;
    death: PlayerData<MatchmakingDeck>;
    actions: any;
}

export interface MatchmakingDeck {
    [championId: string]: CardOptionsLock<Species, ActiveParts>[];
}
