import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente pokemonDetail', () => {
  it('Informações', () => {
    const { getByText } = renderWithRouter(<App />);
    const linkDetails = getByText(/More details/);

    fireEvent.click(linkDetails);
    const text = getByText('Pikachu Details');
    expect(text).toBeInTheDocument();
    expect(linkDetails).not.toBeInTheDocument();

    const summary = getByText('Summary');
    expect(summary).toBeInTheDocument();

    const details = getByText(/This intelligent Pokémon/i);
    expect(details).toBeInTheDocument();
  });

  it('Verificar se existe uma seção com os mapas', () => {
    const { getByText, getAllByAltText } = renderWithRouter(<App />);
    const linkDetails = getByText(/More details/);

    fireEvent.click(linkDetails);
    const headingMaps = getByText('Game Locations of Pikachu');
    expect(headingMaps).toBeInTheDocument();

    const gameLocations = getAllByAltText('Pikachu location');
    expect(gameLocations[0].src).toBeTruthy();
    expect(gameLocations[1].src).toBeTruthy();
  });

  it('Testar se pokemon favorito funciona na página de detalhes', () => {
    const { getByText, getByAltText, getByLabelText } = renderWithRouter(<App />);
    const linkDetails = getByText(/More details/);

    fireEvent.click(linkDetails);
    const fave = getByLabelText(/Pokémon favoritado?/);
    expect(fave).toBeInTheDocument();

    fireEvent.click(fave);
    const altFave = getByAltText(/is marked as favorite/i);
    expect(altFave).toBeInTheDocument();

    fireEvent.click(fave);
    expect(altFave).not.toBeInTheDocument();

    fireEvent.click(fave);
    const altFave2 = getByAltText(/is marked as favorite/i);
    expect(altFave2).toBeInTheDocument();
  });
});
