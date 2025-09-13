import { Timestamp } from 'firebase/firestore';

import { uuid } from '@mystical-mingles/toolkit/uuid';
import { decode } from '@mystical-mingles/toolkit/jwt';
import { Cookies } from '@mystical-mingles/toolkit/dom';

import type { Species } from '@mystical-mingles/engine/species';
import type { TeamOptions } from '@mystical-mingles/engine/team';
import type { MingleBasicOptions } from '@mystical-mingles/engine/mingle';
import Mingle from '@mystical-mingles/engine/mingle';

import type DB from '../db';

import type { FirebaseUser, PlayerData, TeamData } from './interface';

export default class PlayerServices {
    private static PATH = 'users';

    private cookies = new Cookies();

    constructor(private db: DB) { }

    get currentByToken(): { email: string } {
        try {
            const token = this.cookies.get<string>('access_token');

            if (!token) { return { email: '' }; }

            const data = decode<FirebaseUser>(token);

            return { email: data.email };
        } catch {
            return { email: '' };
        }
    }

    async getByEmail(email: string) {
        return this.db.getItem<PlayerData>({
            path: PlayerServices.PATH,
            pathSegments: [],
            filters: [{ field: 'email', operator: '==', value: email }],
        });
    }

    async getMingles(email: string) {
        return this.db.getList<MingleBasicOptions<Species>>({
            path: PlayerServices.PATH,
            pathSegments: [email, 'mingles'],
            filters: []
        }).then(data => data.map((mingle) => new Mingle(mingle)));
    }

    async getTeams(email: string) {
        return this.db.getList<TeamData>({
            path: PlayerServices.PATH,
            pathSegments: [email, 'teams'],
            filters: []
        });
    }

    async createByAuth(user: Pick<PlayerData, 'email' | 'name' | 'id'> & { picture?: string; }) {
        const { email } = user;

        const newUser: PlayerData = {
            ...user,
            roles: ['user'],
            plans: ['gratis'],
            status: 'active',
            picture: user.picture || `https://robohash.org/${email}`,
            createdAt: Timestamp.fromDate(new Date()),
        };

        return this.db.setItem<PlayerData>({
            data: newUser,
            path: PlayerServices.PATH,
            pathSegments: [user.email],
        }).then(() => newUser);
    }

    async createMingle<S extends Species>(email: string, mingleOptions: MingleBasicOptions<S>) {
        const id = uuid();

        const data: MingleBasicOptions<S> = { ...mingleOptions, id };

        return this.db.setItem<MingleBasicOptions<S>>({
            data,
            path: PlayerServices.PATH,
            pathSegments: [email, 'mingles', id],
        }).then(() => data);
    }

    async createTeam(email: string, teamOptions: Pick<TeamOptions, 'champions' | 'name'>) {
        const id = uuid();

        const data: TeamData = {
            ...teamOptions,
            champions: teamOptions.champions.map(t => ({
                id: t.id,
                coordinates: t.coordinates
            })),
        };

        return this.db.setItem<TeamData>({
            data,
            path: PlayerServices.PATH,
            pathSegments: [email, 'teams', id],
        }).then(() => data);
    }
}