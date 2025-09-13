import type { Buff, Debuff, Backdoor } from './interface';

export const buffEffects: Buff[] = ['damage', 'speed'];
export const selfDebuffEffects: Debuff[] = ['weakness'];
export const debuffEffects: Debuff[] = [...selfDebuffEffects, 'stun', 'poison'];
export const backdoorEffects: Backdoor[] = ['faster_backdoor', 'less_life_backdoor'];

export const buffsMultiplicators = {
    damage: (value: number) => value * 0.2,
    speed: (value: number) => value * 0.2
};