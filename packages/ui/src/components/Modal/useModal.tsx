import { useState } from 'react';

type Fn = () => void;

interface UseModalProps { open?: boolean; }
export default function useModal({ open = false }: UseModalProps = {}): [boolean, Fn, Fn, Fn] {
    const [_open, setOpen] = useState(open);

    const toggle = () => setOpen((prev) => !prev);

    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    return [_open, toggle, openModal, closeModal];
};