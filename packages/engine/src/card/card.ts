import { uuid } from '@mystical-mingles/toolkit/uuid';

import type { Effect } from '../effect';
import type { ActiveParts } from '../parts';
import type { Genes, Species } from '../species';

import type { CardOptions, CardOptionsLock, Cost, AttackType, Assets, CardEffect } from './interface';

export default class Card<S extends Species, P extends ActiveParts> implements CardOptions<S, P> {
  private _id: string;

  private _attack: number;
  private _shield: number;

  public readonly part: P;
  public readonly species: S;
  public readonly cost: Cost;
  public readonly type: AttackType;
  public readonly assets: Assets;
  public readonly effect: CardEffect<Effect>;
  public readonly description: string;
  public readonly name: Genes[S][P][number];

  constructor(data: CardOptionsLock<S, P>) {
    this.id = data.id || uuid();
    this.name = data.name;
    this.cost = data.cost;
    this.part = data.part;
    this.type = data.type;
    this.assets = data.assets;
    this.attack = data.attack;
    this.shield = data.shield;
    this.effect = data.effect;
    this.species = data.species;
    this.description = data.description;
  };

  get options(): CardOptionsLock<S, P> {
    return {
      name: this.name,
      cost: this.cost,
      part: this.part,
      type: this.type,
      assets: this.assets,
      attack: this.attack,
      shield: this.shield,
      ...(this.effect ? { effect: this.effect } : {}),
      species: this.species,
      description: this.description,
    };
  }

  get id() { return this._id; }
  set id(value: string) { this._id = value; }

  get attack() { return this._attack; };
  set attack(value: number) { this._attack = value; };

  get shield() { return this._shield; };
  set shield(value: number) { this._shield = value; };
}