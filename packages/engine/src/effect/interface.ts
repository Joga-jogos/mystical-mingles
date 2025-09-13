export type Buff = 'damage' | 'heal' | 'speed';

export type SelfDebuffs = 'weakness';
export type EnemyDebuffs = 'stun' | 'poison';
export type Debuff = SelfDebuffs | EnemyDebuffs;

export type Backdoor = 'faster_backdoor' | 'less_life_backdoor';

export type BuffAndDebuff = Buff | Debuff;

export type Effect = Buff | Debuff | Backdoor;