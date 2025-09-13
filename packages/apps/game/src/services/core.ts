
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

import DB from '@mystical-mingles/services/db';
import PlayerServices from '@mystical-mingles/services/player';
import AuthServices from '@mystical-mingles/services/auth';
import MatchmakingServices from '@mystical-mingles/services/matchmaking';

// VARIABLES
export const url = {
    sso: import.meta.env.VITE_SSO_URL,
    zuera: import.meta.env.VITE_GAME_URL,
};

export const isLocal = import.meta.env.VITE_ENV === 'local';

// FIREBASE
const app = initializeApp({
    appId: import.meta.env.VITE_APP_ID,
    apiKey: import.meta.env.VITE_API_KEY,
    projectId: import.meta.env.VITE_PROJECT_ID,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
}, 'game');

// FIREBASE SERVICES
const firestore = getFirestore(app);

export const authServices = new AuthServices({});

export const db = new DB(firestore);

if (isLocal) {
    connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
}

// ENTITY SERVICES
export const playerServices = new PlayerServices(db);
export const matchmakingServices = new MatchmakingServices(db);
