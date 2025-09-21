import Tooltip from '@mystical-mingles/ui/components/Tooltip';

import type Champion from '@mystical-mingles/engine/champion';
import type { Species } from '@mystical-mingles/engine/species';

import Mingle from '@mystical-mingles/common/Mingle';

import useGameControl from '../../useGameControl';

import ChapionHUD from './components/ChampionHUD';

import './Champion.scss';

interface ChampionProps {
    champion: Champion<Species>;
    direction?: 'left' | 'right';
}

export default function ChampionComponent({ champion, direction = 'left' }: ChampionProps) {
    const { game } = useGameControl();

    if (!game) { return; }

    return (
        <Tooltip
            direction="top"
            label={
                <pre>
                    {JSON.stringify({ id: champion.id, ...champion.stats }, null, 2)}
                </pre>
            }
        >
            <div className="champion" id={champion.id}>
                {
                    champion.isAlive && (
                        <>
                            <ChapionHUD champion={champion} />
                            <div style={{ transform: direction === 'right' ? `scale(-1, 1)` : `scale(1)` }}>
                                <Mingle options={champion.options.mingle} />
                            </div>
                        </>
                    )
                }
                {
                    !champion.isAlive && (
                        <span>MORTIN</span>
                    )
                }
            </div>
        </Tooltip>
    );
}