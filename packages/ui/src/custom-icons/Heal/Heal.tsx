/* eslint-disable max-len */
import createIcon from '../createIcon';
import type { CustomIconProps } from '../interface';

export function Heal(props: CustomIconProps) {
    return (
        <svg stroke="currentColor" fill="currentColor" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M196 16a30 30 0 0 0-30 30v120H46a30 30 0 0 0-30 30v120a30 30 0 0 0 30 30h120v120a30 30 0 0 0 30 30h120a30 30 0 0 0 30-30V346h120a30 30 0 0 0 30-30V196a30 30 0 0 0-30-30H346V46a30 30 0 0 0-30-30H196z">
            </path>
        </svg>
    );
}

export default createIcon(Heal);
/* eslint-enable max-len */