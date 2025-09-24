import type { Species } from '@mystical-mingles/engine';
import type Champion from '@mystical-mingles/engine/champion';

export function getPriority(champions: Champion<Species>[]) {

    // cria uma cópia para não mutar o array original
    const sorted = [...champions].sort((a, b) => {
        // 1. mais rápidos primeiro
        if (a.stats.speed !== b.stats.speed) {
            return b.stats.speed - a.stats.speed;
        }

        // 2. se mesma velocidade, menor vida primeiro
        if (a.life !== b.life) {
            return a.life - b.life;
        }

        // 3. se empatar em tudo, ordem aleatória
        return Math.random() - 0.5;
    });

    return sorted.map(c => c.id);
}