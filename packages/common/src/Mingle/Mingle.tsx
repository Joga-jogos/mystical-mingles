import type { Species } from '@mystical-mingles/engine/species';
import type { MingleOptions } from '@mystical-mingles/engine/mingle';

import Body from './components/Body';
import Eyes from './components/Eyes';
import Mouth from './components/Mouth';
import Back from './components/Back';
import Horn from './components/Horn';

import './Mingle.scss';

interface MingleProps {
    size?: number;
    options: Omit<MingleOptions<Species>, 'cards'> | MingleOptions<Species>;
}

export default function Mingle({ options, size = 100 }: MingleProps) {
  return (
    <div
      data-entity="mingle"
      className="mingle"
      style={{
        color: options.color,
        width: size,
        height: size,
      }}
    >
      <Body
        eye={<Eyes name={options.genes.eye.name} />}
        mouth={<Mouth name={options.genes.mouth.name} />}
        back={<Back name={options.genes.back.name} />}
        horn={<Horn name={options.genes.horn.name} />}
      />
    </div>
  );
}