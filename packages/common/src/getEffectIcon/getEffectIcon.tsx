import BoltIcon from '@mystical-mingles/ui/custom-icons/Bolt';
import HealIcon from '@mystical-mingles/ui/custom-icons/Heal';
import TargetIcon from '@mystical-mingles/ui/custom-icons/Target';
import GloveIcon from '@mystical-mingles/ui/custom-icons/Glove';
import SpiralIcon from '@mystical-mingles/ui/custom-icons/Spiral';
import FastIcon from '@mystical-mingles/ui/custom-icons/Fast';
import type { CustomIconProps } from '@mystical-mingles/ui/custom-icons';

import type { Effect } from '@mystical-mingles/engine/effect';

export function getEffectIcon(effect: Effect) {
    const MAP_ICON: { [E in Effect]: (props: CustomIconProps) => React.JSX.Element } = {
        raise_fury: (props: CustomIconProps) => <GloveIcon size={18} {...props} />,
        raise_speed: (props: CustomIconProps) => <GloveIcon size={18} {...props} />,

        raise_damage: (props: CustomIconProps) => <GloveIcon size={18} {...props} />,
        increase_damage_first: (props: CustomIconProps) => <GloveIcon size={18} {...props} />,
        increase_damage_last: (props: CustomIconProps) => <GloveIcon size={18} {...props} />,

        stun: (props: CustomIconProps) => <SpiralIcon size={22} {...props} />,
        slowness: (props: CustomIconProps) => <FastIcon size={18} {...props} />,

        heal: (props: CustomIconProps) => <HealIcon {...props} />,
        heal_damage: (props: CustomIconProps) => <HealIcon {...props} />,

        energy_destroy: (props: CustomIconProps) => <BoltIcon size={18} {...props} />,
        energy_gain: (props: CustomIconProps) => <BoltIcon size={18} {...props} />,
        energy_steal: (props: CustomIconProps) => <BoltIcon size={18} {...props} />,

        faster: (props: CustomIconProps) => <TargetIcon {...props} />,
        slower: (props: CustomIconProps) => <TargetIcon {...props} />,
        less_life: (props: CustomIconProps) => <TargetIcon {...props} />,
    };

    return MAP_ICON[effect];
}