import { Liste } from '@/types';

export const LISTES: Liste[] = [
  {
    id: '01',
    name: 'Les Verts',
    party: 'Verts',
    partyColor: 'green',
    candidates: [
      { id: '01.01', name: 'Julien Lefèvre', listId: '01' },
      { id: '01.02', name: 'Claire Dubois', listId: '01' },
      { id: '01.03', name: 'Mathieu Bernard', listId: '01' },
      { id: '01.04', name: 'Sophie Laurent', listId: '01' },
      { id: '01.05', name: 'Lucas Moreau', listId: '01' },
      { id: '01.06', name: 'Élodie Fontaine', listId: '01' },
    ],
  },
  {
    id: '02',
    name: 'PS',
    party: 'PS',
    partyColor: 'red',
    candidates: [
      { id: '02.01', name: 'Isabelle Martin', listId: '02' },
      { id: '02.02', name: 'Thomas Rochat', listId: '02' },
      { id: '02.03', name: 'Amélie Chevalier', listId: '02' },
      { id: '02.04', name: 'François Morel', listId: '02' },
      { id: '02.05', name: 'Marie-Claire Bonnet', listId: '02' },
    ],
  },
  {
    id: '03',
    name: 'PDC',
    party: 'PDC',
    partyColor: 'orange',
    candidates: [
      { id: '03.01', name: 'Pierre Müller', listId: '03' },
      { id: '03.02', name: 'Anne-Sophie Favre', listId: '03' },
      { id: '03.03', name: 'Christophe Dupont', listId: '03' },
      { id: '03.04', name: 'Nathalie Vidal', listId: '03' },
      { id: '03.05', name: 'Jean-Paul Girard', listId: '03' },
    ],
  },
  {
    id: '04',
    name: 'PLR',
    party: 'PLR',
    partyColor: 'blue',
    candidates: [
      { id: '04.01', name: 'Sara Berthod', listId: '04' },
      { id: '04.02', name: 'Loïc Deschamps', listId: '04' },
      { id: '04.03', name: 'Danny Ulmann', listId: '04' },
      { id: '04.04', name: 'David Bonzon', listId: '04' },
      { id: '04.05', name: 'Pierre Maillard', listId: '04' },
      { id: '04.06', name: 'Marie Délèze', listId: '04' },
    ],
  },
  {
    id: '05',
    name: 'UDC',
    party: 'UDC',
    partyColor: 'gray',
    candidates: [
      { id: '05.01', name: 'Alexandre Favre', listId: '05' },
      { id: '05.02', name: 'Sandrine Pont', listId: '05' },
      { id: '05.03', name: 'Marc Rochat', listId: '05' },
      { id: '05.04', name: 'Sylvie Zimmermann', listId: '05' },
      { id: '05.05', name: 'Patrick Reymond', listId: '05' },
    ],
  },
  {
    id: '06',
    name: 'solidaritéS',
    party: 'sol.',
    partyColor: 'purple',
    candidates: [
      { id: '06.01', name: 'Natalia Fernandez', listId: '06' },
      { id: '06.02', name: 'Kevin Nguyen', listId: '06' },
      { id: '06.03', name: 'Aminata Diallo', listId: '06' },
      { id: '06.04', name: 'Rafael Torres', listId: '06' },
    ],
  },
];
