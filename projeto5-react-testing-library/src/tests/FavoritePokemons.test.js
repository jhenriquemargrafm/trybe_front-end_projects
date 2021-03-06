import React from 'react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa o componente FavoritePokemons', () => {
  it('Teste No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const text = getByText('No favorite pokemon found');
    expect(text).toBeInTheDocument();
  });

  it('Exibição dos pokémons favoritados.', () => {
    const favePokemons = [
      {
        id: 65,
        name: 'Alakazam',
        type: 'Psychic',
        averageWeight: {
          value: '48.0',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png',
        moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Alakazam_(Pok%C3%A9mon)',
        foundAt: [
          {
            location: 'Unova Accumula Town',
            map: 'https://cdn2.bulbagarden.net/upload/4/44/Unova_Accumula_Town_Map.png',
          },
        ],
        summary: 'Closing both its eyes heightens all its other senses.',
      },
      {
        id: 25,
        name: 'Pikachu',
        type: 'Electric',
        averageWeight: {
          value: '6.0',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
        moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
        foundAt: [
          {
            location: 'Kanto Viridian Forest',
            map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
          },
          {
            location: 'Kanto Power Plant',
            map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
          },
        ],
        summary: 'This intelligent Pokémon roasts hard berries with electricity.',
      },
      {
        id: 4,
        name: 'Charmander',
        type: 'Fire',
        averageWeight: {
          value: '8.5',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
        moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
        foundAt: [
          {
            location: 'Alola Route 3',
            map: 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
          },
          {
            location: 'Kanto Route 3',
            map: 'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
          },
          {
            location: 'Kanto Route 4',
            map: 'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
          },
          {
            location: 'Kanto Rock Tunnel',
            map: 'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
          },
        ],
        summary: 'The flame on its tail shows the strength of its life force.',
      },
    ];

    const { getAllByText } = renderWithRouter(
      <FavoritePokemons pokemons={ favePokemons } />,
    );

    const quantFav = getAllByText('More details');
    expect(quantFav.length).toBe(favePokemons.length);
  });

  it('Testa que nenhum card de pokémon é exibido', () => {
    const favePokemons = [];
    const { queryByText } = renderWithRouter(
      <FavoritePokemons pokemons={ favePokemons } />,
    );
    const quantFav = queryByText('More details');
    expect(quantFav).not.toBeInTheDocument();
  });
});
