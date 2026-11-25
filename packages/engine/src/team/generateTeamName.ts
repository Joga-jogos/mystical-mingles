import { getRandom } from '@mystical-mingles/toolkit/array';

const animals = [
  'Leões', 'Corujas', 'Raposas', 'Ursos', 'Lobos',
  'Pinguins', 'Cavalos', 'Jacarés', 'Elefantes', 'Gatos',
  'Cangurus', 'Tamanduás', 'Águias', 'Tatus', 'Camaleões'
];

const adjetivos = [
  'Velozes', 'Brilhantes', 'Misteriosos', 'Selvagens', 'Astutos',
  'Sombrios', 'Corajosos', 'Incríveis', 'Ferozes', 'Sábios',
  'Lendários', 'Elétricos', 'Magníficos', 'Furtivos', 'Espaciais'
];

export function generateTeamName() {
  return `${getRandom(animals)} ${getRandom(adjetivos)}`;
};