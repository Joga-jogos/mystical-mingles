import type Champion from '@mystical-mingles/engine/champion';
import type { Species } from '@mystical-mingles/engine/species';

import './Champion.scss';

interface ChampionProps {
    champion: Champion<Species>;
}

export default function ChampionComponent({ champion }: ChampionProps) {
    return (
        <div className="champion">
            <div className="champion__life">
                {champion.life}
            </div>
            {champion.name}
        </div>
    );
}