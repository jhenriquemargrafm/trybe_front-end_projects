import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';

const pokemon = {
  id: 143,
  name: 'Snorlax',
  type: 'Normal',
  averageWeight: {
    value: '460.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Snorlax_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Vermillion City',
      map: 'https://cdn2.bulbagarden.net/upload/5/54/Kanto_Vermilion_City_Map.png',
    },
  ],
  summary: 'What sounds like...',
};
let isFavorite = false;

describe('Teste do componente Pokémon', () => {
  it('Testar informações do pokémon', () => {
    const { getByTestId, getByText, getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ isFavorite }
      />,
    );

    const name = getByText('Snorlax');
    expect(name).toBeInTheDocument();

    const type = getByText('Normal');
    expect(type).toBeInTheDocument();

    const weight = getByTestId('pokemon-weight');
    expect(weight).toHaveTextContent('Average weight: 460.0 kg');

    const img = getByAltText('Snorlax sprite');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(pokemon.image);
  });

  it('Checar link para ver detalhes do pokémon', () => {
    const { getByText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ isFavorite }
      />,
    );

    const link = getByText('More details');
    expect(link).toBeInTheDocument();
    expect(link.href).toBe('http://localhost/pokemons/143');
  });

  it('Redirecionamento para detalhes do Pokémon', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/More details/));
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Teste da URL', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);

    const link = getByText(/More details/);
    expect(link.href).toBe('http://localhost/pokemons/25');

    fireEvent.click(getByTestId('next-pokemon'));
    expect(link.href).toBe('http://localhost/pokemons/4');
  });

  it('Checar favoritado', () => {
    isFavorite = true;
    const { getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ isFavorite }
      />,
    );

    const altText = 'Snorlax is marked as favorite';
    const img = getByAltText(altText);

    expect(img).toBeInTheDocument();
    expect(img.src).toBe('http://localhost/star-icon.svg');
  });
});
