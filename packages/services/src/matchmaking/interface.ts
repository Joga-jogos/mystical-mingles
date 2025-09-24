import type { Timestamp } from 'firebase/firestore';

import type { Species } from '@mystical-mingles/engine/species';
import type { ActiveParts } from '@mystical-mingles/engine/parts';
import type { CardOptionsLock, Type } from '@mystical-mingles/engine/card';
import type { ChampionOptionsWithMingleOptions, SetOfEffects } from '@mystical-mingles/engine/champion';

export type ByPlayer<T> = { [playerId: string]: T }
export type ByChampion<T> = { [championId: string]: T }

export type MatchmakingStatus = 'waiting' | 'ready' | 'pending' | 'animating';

export interface MatchmakingData {
    id: string;
    hash: string;
    createdAt: Timestamp;
    status: MatchmakingStatus;
    players: ByPlayer<MatchmakingPlayerData>;
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
    updatedAt: any;
    priority: string[];
    whoSawTheAnimation: string[];
    whoHasAlreadyPlayed: string[];
    actions: MatchmakingAction[];
    players: ByPlayer<MatchMakingRoundPlayer>;
}

export interface MatchMakingRoundPlayer {
    energy: number;
    hand: MatchmakingDeck;
    deck: MatchmakingDeck;
    death: MatchmakingDeck;
    inPlay: MatchmakingDeck;
    championsState: ByChampion<MatchmakingRoundChampion>;
}

export interface MatchmakingRoundChampion {
    life: number;
    buffs: SetOfEffects;
}

export interface MatchmakingDeck {
    [championId: string]: CardOptionsLock<Species, ActiveParts>[];
}

export interface MatchmakingAction {
    actor: ChampionOptionsWithMingleOptions<Species>;
    target: ChampionOptionsWithMingleOptions<Species>;
    type: Type;
    damage: number;
    miss: boolean;
    critical: boolean;
    truedamage: boolean;
}