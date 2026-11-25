import { modificators } from '../species';
import type { Stats } from '../parts';
import type { Buff, Debuff, Effect } from '../effect';
import type { Category, Species } from '../species';
import type { MingleCards, MingleColor, MingleGenes } from '../mingle';

import type {
    ChampionOptions,
    ChampionBaseOptions,
    Coordinates,
    SetOfEffects,
    ChampionOptionsWithMingleOptions
} from './interface';

export default class Champion<S extends Species> implements ChampionOptions {
    public readonly id: string;
    public readonly name: string;

    public readonly species: S;
    public readonly createdAt: Date;
    public readonly category: Category;
    public readonly genes: MingleGenes;
    public readonly cards: MingleCards;
    public readonly color: MingleColor<S>;
    public readonly coordinates: Coordinates;

    public life: number;
    public lastLife: number;
    public shield: number;

    public stats: Stats;

    public buffs: SetOfEffects<Buff>;
    public debuffs: SetOfEffects<Debuff>;

    constructor({ mingle, shield, buffs, debuffs, life, lastLife, coordinates }: ChampionBaseOptions<S>) {
        this.shield = shield || 0;
        this.coordinates = coordinates;

        this.id = mingle.id;
        this.name = mingle.name;
        this.stats = mingle.stats;
        this.cards = mingle.cards;
        this.genes = mingle.genes;
        this.color = mingle.color;
        this.species = mingle.species;
        this.category = mingle.category;
        this.createdAt = mingle.createdAt;

        this.buffs = buffs || {};
        this.debuffs = debuffs || {};

        this.life = life ?? Math.ceil(mingle.stats.life * modificators[mingle.species]);
        this.lastLife = lastLife ?? life;
    }

    get options(): ChampionOptionsWithMingleOptions<S> {
        return {
            coordinates: this.coordinates,
            life: this.life,
            buffs: this.buffs,
            debuffs: this.debuffs,
            shield: this.shield,
            mingle: {
                id: this.id,
                name: this.name,
                stats: this.stats,
                genes: this.genes,
                color: this.color,
                species: this.species,
                category: this.category,
                createdAt: this.createdAt,
            },
        };
    }

    get isAlive() { return this.life > 0; }
    get totalLife() { return Math.ceil(this.stats.life * modificators[this.species]); }

    get isStunned() { return this.debuffs.stun; }

    takeDamage(damage: number) {
        const remainingDamage = damage - this.shield;

        if (remainingDamage < 0) {
            this.shield = Math.abs(Math.ceil(remainingDamage));
            return;
        }

        this.shield = 0;

        const newLife = this.life - remainingDamage;

        this.life = newLife > 0 ? newLife : 0;
    }

    takeTrueDamage(damage: number) {
        const newLife = this.life - damage;

        this.life = newLife > 0 ? newLife : 0;
    }

    applyBuff(effect: Effect, value: number) {
        console.log('>>>', this.buffs[effect], value);

        if (this.buffs[effect]) {
            this.buffs[effect] += value;
            return;
        }

        this.buffs[effect] = value;
    }
}