import React, { useEffect, useState } from 'react';

type Style = React.HTMLAttributes<HTMLDivElement>['style'];

const zoomShow = (timeout: number): Style => ({
    transform: 'scale(1)',
    transition: `all ${timeout}s cubic-bezier(0.4, 0, 0.2, 1)`,
});

const zoomHide = (timeout: number): Style => ({
    transform: 'scale(0)',
    transition: `all ${timeout}s cubic-bezier(0.4, 0, 0.2, 1)`,
});

interface ZoomProps extends React.HTMLAttributes<HTMLDivElement> {
    enter: boolean;
    delay?: number;
    timeout?: number;
    children: React.ReactNode;
    tag?: React.ElementType;
}
export default function Zoom({
    children,
    enter,
    tag = 'div',
    delay = 50,
    timeout = .2,
    ...props
}: Readonly<ZoomProps>) {
    const CustomTag = tag;

    const [style, setStyle] = useState<Style>(zoomHide(timeout));

    useEffect(() => {
        setTimeout(() => {
            setStyle(enter ? zoomShow(timeout) : zoomHide(timeout));
        }, delay);
    }, [enter]);

    return (
        <CustomTag {...props} style={{ ...style, ...props.style }}>
            {children}
        </CustomTag>
    );
}