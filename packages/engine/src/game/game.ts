import { uuid } from '@mystical-mingles/toolkit/uuid';

import type Player from '../player';

import type { GameOptions } from './interface';

export default class Game implements GameOptions {
    public id: string;
    public round: number = 0;
    public priority: string[] = [];

    public players: Player[];

    public createdAt: Date;
    public updatedAt?: Date;

    private _update!: (values: Partial<GameOptions>) => void;

    constructor({ id, players, round, priority }: GameOptions) {
        this.id = id || uuid();
        this.players = players;
        this.round = round || 1;
        this.priority = priority;
    }

    get champions() {
        if (this.players.length < 2) { return []; }

        return [...this.players[0].team.champions, ...this.players[1].team.champions];
    }

    get alive() {
        return this.champions.filter(c => c.isAlive);
    }

    get turnOrder() {
        return this.priority.map(championId => {
            const champion = this.champions.find(champion => champion.id === championId);

            if (!champion) { throw new Error('Campeão não encontrado'); }

            return champion;
        });
    }

    get update() { return this._update; }
    set update(fn: (values: Partial<GameOptions>) => any) {
        this._update = fn;
    }
}