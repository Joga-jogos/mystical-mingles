/* eslint-disable max-len */
import createIcon from '../createIcon';
import type { CustomIconProps } from '../interface';

function Sword(props: CustomIconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="currentColor" version="1.1" x="0" y="0" viewBox="0 0 27 27" xmlSpace="preserve" {...props}>
            <g>
                <path d="M25.196 1.794a.993.993 0 0 0-.81-.28l-6.04.63c-.26.02-.49.14-.65.33L7.97 13.618l-1.594-1.594a.996.996 0 0 0-1.41 0 3.072 3.072 0 0 0 0 4.36L6.21 17.63l-4.034 4.034a2.243 2.243 0 0 0 0 3.18 2.27 2.27 0 0 0 3.18 0l4.032-4.031 1.388 1.391a3.088 3.088 0 0 0 4.36 0c.39-.39.39-1.03 0-1.42l-1.773-1.774 11.143-9.726c.19-.16.31-.39.33-.64l.64-6.03c.04-.3-.07-.6-.28-.82z" opacity="1">
                </path>
            </g>
        </svg>
    );
}

export default createIcon(Sword);
/* eslint-enable max-len */