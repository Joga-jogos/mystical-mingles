import type { ComponentType } from 'react';

import { convertPathToColor, useTheme } from '../theme';

import type { CustomIconProps } from './interface';

export default function createIcon(IconComponent: ComponentType<CustomIconProps>) {
    const EnhancedComponent: React.FC<CustomIconProps> = ({
        size = 16,
        color = 'primary.main',
        ...props
    }) => {
        const { theme: { palette } } = useTheme();

        const c = convertPathToColor(color, palette);

        return (
            <IconComponent
                {...(props as CustomIconProps)}
                style={{
                    color: props.style?.color || c,
                    width: size,
                    height: size,
                }}
            />
        );
    };

    return EnhancedComponent;
}