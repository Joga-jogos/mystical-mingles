import type { CSSProperties, HTMLAttributes } from 'react';

import joinClass from '../../utils/joinClass/joinClass';
import createComponent from '../../core/createComponent';

import './Stack.scss';

export type Orientation = 'row' | 'column';
export type Distance = 'small' | 'medium' | 'large';

export interface StackProps extends HTMLAttributes<HTMLElement> {
    gap?: number;
    flexDirection?: CSSProperties['flexDirection'];
    tag?: React.ElementType;
    children: React.ReactNode;
}

function Stack({
    children,
    tag = 'div',
    gap = 16,
    flexDirection = 'row',
    ...props
}: Readonly<StackProps>) {
    const CustomTag = tag;
    const cls = joinClass([
        'ui-stack',
        props.className
    ]);

    return (
        <CustomTag
            {...props}
            className={cls}
            style={{
                ...props.style,
                gap,
                flexDirection
            }}
        >
            {children}
        </CustomTag>
    );
}

export default createComponent(Stack);