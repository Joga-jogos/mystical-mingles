import type { Species } from '@mystical-mingles/engine/species';
import type { MingleOptions } from '@mystical-mingles/engine/mingle';

import './Mingle.scss';

interface MingleProps {
    options: Omit<MingleOptions<Species>, 'cards'> | MingleOptions<Species>;
}

export default function Mingle({ options }: MingleProps) {
    return (
        <div
            data-entity="mingle"
            className="mingle"
            style={{ background: options.color }}
        >
            {options.name}
        </div>
    );
}