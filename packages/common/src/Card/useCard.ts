import type { Species } from '@mystical-mingles/engine/species';

export default function useCard(species: Species) {
  const SPECIES_CARD_COLOR: { [s in Species]: string } = {
    // bug: '#F38EAC',
    // bird: '#FBD2F3',
    fish: '#BBECF9',
    // plant: '#C1CAA5',
    // rodent: '#FFE59A',
    reptile: '#BF95CE',
  };

  return {
    background: SPECIES_CARD_COLOR[species]
  };
}