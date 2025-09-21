import type Player from '../player';

export interface GameOptions {
    id: string;
    round: number;
    priority: string[];
    createdAt: Date;
    updatedAt?: Date;
    players: Player[];
};
