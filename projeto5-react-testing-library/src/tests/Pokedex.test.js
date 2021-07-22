import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import { Pokedex } from '../components';
import pokemons from '../data';

const isPokemonFavoriteById = pokemons.map((pokemon) => pokemon.id);

describe('Testa o Componente "Pokédex".', () => {
  const textNextPokemon = 'Próximo pokémon';
  const pokemonName = 'pokemon-name';
  it('heading h2 com Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const title = getByRole('heading', { name: 'Encountered pokémons' });
    expect(title).toBeInTheDocument();
  });

  it('Botão Próximo pokémon mostra outro pokémon', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const nextPokemon = getByText(textNextPokemon);

    userEvent.click(nextPokemon);
    let pokemon = getByTestId(pokemonName);
    expect(pokemon.textContent).toBe('Charmander');

    userEvent.click(nextPokemon);
    pokemon = getByTestId(pokemonName);
    expect(pokemon.textContent).toBe('Caterpie');

    userEvent.click(nextPokemon);

    userEvent.click(nextPokemon);

    pokemon = getByTestId(pokemonName);
    expect(pokemon.textContent).toBe('Alakazam');

    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);

    pokemon = getByTestId(pokemonName);
    expect(pokemon.textContent).toBe('Pikachu');

    expect(nextPokemon).toBeInTheDocument();
  });

  it('Apenas um Pokémon por vez', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const name = getAllByTestId(pokemonName);
    expect(name.length).toBe(1);
  });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const filter = getByRole('button', { name: 'Psychic' });
    const nextPokemon = getByRole('button', { name: textNextPokemon });

    userEvent.click(filter);
    const alakazam = getByText('Alakazam');
    expect(alakazam).toBeInTheDocument();

    userEvent.click(nextPokemon);
    const mew = getByText('Mew');
    expect(mew).toBeInTheDocument();
  });

  it('Botão para resetar o filtro', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const allTypes = getByRole('button', { name: 'All' });
    expect(allTypes).toBeInTheDocument();

    fireEvent.click(allTypes);
    const firstPokemon = getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();
  });

  it('Botão de filtragem', () => {
    const { getByRole, getByText, getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const array = 7;
    const filter = getAllByTestId('pokemon-type-button');
    expect(filter.length).toBe(array);

    const next = getByRole('button', { name: /próximo pokémon/i });
    const all = getByRole('button', { name: /all/i });
    const electric = getByRole('button', { name: /electric/i });
    const fire = getByRole('button', { name: /fire/i });
    const bug = getByRole('button', { name: /bug/i });
    const psychic = getByRole('button', { name: /psychic/i });
    const normal = getByRole('button', { name: /normal/i });
    const dragon = getByRole('button', { name: /dragon/i });

    expect(next).toBeInTheDocument();
    expect(all).toBeInTheDocument();
    expect(electric).toBeInTheDocument();
    expect(fire).toBeInTheDocument();
    expect(bug).toBeInTheDocument();
    expect(psychic).toBeInTheDocument();
    expect(normal).toBeInTheDocument();
    expect(dragon).toBeInTheDocument();

    fireEvent.click(all);
    const pikachu = getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });

  it('Botão próximo pokémon desabilitado', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);

    const dragon = getByRole('button', { name: 'Dragon' });
    userEvent.click(dragon);

    const pokemon = getByTestId(pokemonName);
    expect(pokemon.textContent).toBe('Dragonair');

    const next = getByRole('button', { name: textNextPokemon });
    userEvent.click(next);
    const currentpokémon = getByTestId(pokemonName);
    expect(currentpokémon.textContent).toBe('Dragonair');
  });
});
