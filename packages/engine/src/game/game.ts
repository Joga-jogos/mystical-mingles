import { uuid } from '@mystical-mingles/toolkit/uuid';

import System from '../system';
import type Player from '../player';

import type { GameOptions } from './interface';

export default class Game extends System implements GameOptions {
    public id: string;
    public round: number = 0;

    public createdAt: Date;
    public updatedAt?: Date;
    public players: Player[];

    private _update!: (values: Partial<GameOptions>) => void;

    constructor({ id, players, round }: GameOptions) {
        super();

        this.id = id || uuid();
        this.players = players;
        this.round = round || 1;
    }

    get alive() {
        if (this.players.length < 2) { return []; }

        return [...this.players[0].team.priorityOrder, ...this.players[1].team.priorityOrder]
            .filter(a => a.stats.life > 0)
            .sort((a, b) => a.stats.speed > b.stats.speed ? -1 : 1);
    }

    get update() { return this._update; }
    set update(fn: (values: Partial<GameOptions>) => any) {
        this._update = fn;
    }

    public getTurnActions() { this.make(); }
}