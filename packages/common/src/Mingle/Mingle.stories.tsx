import type { Meta, StoryObj } from '@storybook/react';

import Stack from '@mystical-mingles/ui/components/Stack';

import { uuid } from '@mystical-mingles/toolkit/uuid';

import Mingle from '@mystical-mingles/engine/mingle';

import MingleUI from './Mingle';

const meta: Meta<typeof MingleUI> = {
  title: 'Mingle',
  component: MingleUI,
};

const fish1 = new Mingle({
  id: uuid(),
  species: 'fish',
  color: '#00b8ff',
  name: 'Huguinho',
  genes: {
    back: { name: 'fish back 1', species: 'fish' },
    eye: { name: 'fish eye 1', species: 'fish' },
    horn: { name: 'fish horn 1', species: 'fish' },
    mouth: { name: 'fish mounths 1', species: 'fish' },
    tail: { name: 'fish tails 1', species: 'fish' },
  },
  createdAt: new Date(),
});

const fish2 = new Mingle({
  id: uuid(),
  species: 'fish',
  color: '#00dff3',
  name: 'Huguinho',
  genes: {
    back: { name: 'fish back 2', species: 'fish' },
    eye: { name: 'fish eye 2', species: 'fish' },
    horn: { name: 'fish horn 2', species: 'fish' },
    mouth: { name: 'fish mounths 2', species: 'fish' },
    tail: { name: 'fish tails 2', species: 'fish' },
  },
  createdAt: new Date(),
});

const reptile1 = new Mingle({
  id: uuid(),
  species: 'reptile',
  color: '#9967fb',
  name: 'Huguinho',
  genes: {
    back: { name: 'reptile back 1', species: 'reptile' },
    eye: { name: 'reptile eye 1', species: 'reptile' },
    horn: { name: 'reptile horn 1', species: 'reptile' },
    mouth: { name: 'reptile mounths 1', species: 'reptile' },
    tail: { name: 'reptile tails 1', species: 'reptile' },
  },
  createdAt: new Date(),
});

const reptile2 = new Mingle({
  id: uuid(),
  species: 'reptile',
  color: '#5e436d',
  name: 'Huguinho',
  genes: {
    back: { name: 'reptile back 2', species: 'reptile' },
    eye: { name: 'reptile eye 2', species: 'reptile' },
    horn: { name: 'reptile horn 2', species: 'reptile' },
    mouth: { name: 'reptile mounths 2', species: 'reptile' },
    tail: { name: 'reptile tails 2', species: 'reptile' },
  },
  createdAt: new Date(),
});

export const Default: StoryObj<typeof MingleUI> = {
  render: () => {
    const SIZE = 200;
    return (
      <Stack>
        <MingleUI size={SIZE} options={fish1} />
        <MingleUI size={SIZE} options={fish2} />
        <MingleUI size={SIZE} options={reptile1} />
        <MingleUI size={SIZE} options={reptile2} />
      </Stack>
    );
  }
};

export default meta;