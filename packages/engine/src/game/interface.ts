import type Player from '../player';

export interface GameOptions {
    id: string;
    round: number;
    createdAt: Date;
    updatedAt?: Date;
    players: Player[];
};
