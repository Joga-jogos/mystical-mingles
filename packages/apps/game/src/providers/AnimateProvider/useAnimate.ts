import { useContext } from 'react';

import { AnimateContext } from './AnimateProvider';

export default function useAnimate() {
    return useContext(AnimateContext);
}