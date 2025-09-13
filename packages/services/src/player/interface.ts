import type { Timestamp } from 'firebase/firestore';

import type { Coordinates } from '@mystical-mingles/engine/champion';

export type PlayerStatus = 'active' | 'inactive';

export interface PlayerData {
    id: string;
    name: string;
    email: string;
    picture: string;
    roles: string[];
    plans: string[];
    createdAt: Timestamp;
    status: PlayerStatus;
}

export interface TeamData {
    name: string;
    champions: ChampionData[];
}

export interface ChampionData {
    id: string;
    coordinates: Coordinates;
}

export interface FirebaseUser {
    email: string;
    email_verified: boolean;
    name: string;
    user_id: string;
    picture: string;
    auth_time: number;
    firebase: {
        identities: {
            email: Array<string>;
        };
        sign_in_provider: string;
    };
    iat: number;
    exp: number;
    aud: string;
    iss: string;
    sub: string;
}
