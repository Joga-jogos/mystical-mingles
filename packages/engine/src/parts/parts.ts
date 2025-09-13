import type { ActiveParts, BodyParts, PassiveParts, GeneParts } from './interface';

export const passiveParts: PassiveParts[] = ['eye', 'body'];
export const activeParts: ActiveParts[] = ['horn', 'tail', 'mouth', 'back'];
export const geneParts: GeneParts[] = ['eye', ...activeParts];
export const bodyParts: BodyParts[] = [...passiveParts, ...activeParts];
