import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Testes do componente About', () => {
  it('Testa se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = render(<About />);
    const informationTitle = getByText(/About Pokédex/i);
    expect(informationTitle).toBeInTheDocument();
  });

  it('Testa se a página contém um heading h2 com o texto', () => {
    const { getByRole } = render(<About />);
    const title = getByRole('heading', { name: /About Pokédex/i });
    expect(title).toBeInTheDocument();
  });

  it('Testa se a página contém dois parágrafos', () => {
    const { getAllByText } = render(<About />);
    const text = getAllByText(/Pokémons/i);
    expect(text.length).toBe(2);
  });

  it('Testa se a página contém a imagem', () => {
    const { getByRole } = render(<About />);
    const img = getByRole('img');

    expect(img).toBeInTheDocument();
    expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
