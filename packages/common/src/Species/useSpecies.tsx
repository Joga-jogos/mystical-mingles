import BirdIcon from '@mystical-mingles/ui/custom-icons/Bird';
import FishIcon from '@mystical-mingles/ui/custom-icons/Fish';
import type { CustomIconProps } from '@mystical-mingles/ui/custom-icons';

import type { Species } from '@mystical-mingles/engine/species';
import { colors } from '@mystical-mingles/engine/species';

export function useSpecies(species: Species) {
    const icons: { [s in Species]: React.FC<CustomIconProps> } = {
        bird: BirdIcon,
        fish: FishIcon,
    };

    return {
        Icon: icons[species],
        color: colors[species].map(r => r).sort((a, b) => a > b ? 1 : -1)[2]
    };
}