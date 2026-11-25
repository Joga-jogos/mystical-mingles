import joinClass from '@mystical-mingles/ui/utils/joinClass';
import Zoom from '@mystical-mingles/ui/animations/Zoom';

import type Champion from '@mystical-mingles/engine/champion';
import type { Species } from '@mystical-mingles/engine/species';

import Mingle from '@mystical-mingles/common/Mingle';

import useAnimate from '@/providers/AnimateProvider/useAnimate';

import useGameControl from '../../useGameControl';

import ChapionHUD from './components/ChampionHUD';

import './Champion.scss';

interface ChampionProps {
    champion: Champion<Species>;
    direction?: 'left' | 'right';
    onOpen: (champion: Champion<Species>) => void;
}

export default function ChampionComponent({ champion, direction = 'left', onOpen }: ChampionProps) {
    const { actor } = useAnimate();

    const { game } = useGameControl();

    const classes = joinClass([
        'champion',
        (actor?.id === champion.id) && 'champion--active'
    ]);

    const handlOpen = () => { onOpen(champion); };

    if (!game) { return; }

    return (
        <button
            id={champion.id}
            className={classes}
            style={{
                animationDelay: `${Math.random() * 1.5}s`,
            }}
            onClick={handlOpen}
        >
            {
                champion.isAlive && (
                    <Zoom enter delay={400}>
                        <ChapionHUD champion={champion} />
                        <div style={{ transform: direction === 'right' ? 'scale(-1, 1)' : 'scale(1)' }}>
                            <Mingle options={champion.options.mingle} size={120} />
                        </div>
                    </Zoom>
                )
            }
            {
                !champion.isAlive && (
                    <span>MORTIN</span>
                )
            }
        </button>
    );
}