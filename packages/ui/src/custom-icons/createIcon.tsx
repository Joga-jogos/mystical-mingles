import type { ComponentType } from 'react';

import { convertPathToColor, useTheme } from '../theme';

import type { IconProps } from './interface';

export default function createIcon(IconComponent: ComponentType<IconProps>) {
    const EnhancedComponent: React.FC<IconProps> = ({
        size = 16,
        color = 'primary.main',
        ...props
    }) => {
        const { theme: { palette } } = useTheme();

        const c = convertPathToColor(color, palette);

        return (
            <IconComponent
                {...(props as IconProps)}
                style={{
                    color: c,
                    width: size,
                    height: size,
                }}
            />
        );
    };

    return EnhancedComponent;
}