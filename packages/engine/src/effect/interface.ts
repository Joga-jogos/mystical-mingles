
export type Type = 'buff' | 'debuff' | 'resource' | 'backdoor' | 'situational'
export type Target = 'self' | 'teammate' | 'target';

export type Buff = typeof buffs[number];
export type Debuff = typeof debuffs[number];
export type Resource = typeof resource[number];
export type Backdoor = typeof backdoor[number];
export type Situational = typeof situational[number];

export type BuffAndDebuff = Buff | Debuff;

export type Effect = Buff | Debuff | Backdoor | Resource | Situational;

export const buffs = [
    'raise_damage',
    'raise_speed',
    'raise_fury',
] as const;

export const debuffs = [
    'slowness',
    'stun',
] as const;

export const backdoor = [
    'faster',
    'slower',
    'less_life',
] as const;

export const resource = [
    'heal',
    'heal_damage',
    'energy_gain',
    'energy_steal',
    'energy_destroy',
] as const;

export const situational = [
    'increase_damage_last',
    'increase_damage_first',
] as const;