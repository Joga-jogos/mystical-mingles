import type { SVGProps } from 'react';

import type { MappedColors } from '../theme';

export interface CustomIconProps extends Omit<SVGProps<SVGSVGElement>, 'size' | 'color'> {
    size?: number;
    color?: MappedColors;
}