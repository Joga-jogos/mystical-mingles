/* eslint-disable max-len */
import createIcon from '../createIcon';
import type { CustomIconProps } from '../interface';

function Fish(props: CustomIconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 24 24" fill="currentColor" {...props}>
            <g>
                <path d="M13 3a7 7 0 0 0 0 14 5 5 0 0 0 0-10 3 3 0 0 0 0 6 1 1 0 0 0 0-2 1 1 0 0 1 0-2 3 3 0 0 1 0 6 5 5 0 0 1 0-10 7 7 0 0 1 0 14 9 9 0 0 1-9-9 1 1 0 0 0-2 0 11 11 0 0 0 11 11 9 9 0 0 0 0-18z"></path>
            </g>
        </svg>
    );
}

export default createIcon(Fish);
/* eslint-enable max-len */