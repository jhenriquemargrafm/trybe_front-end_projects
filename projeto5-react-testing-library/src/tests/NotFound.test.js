import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente NotFound', () => {
  it('Testa o heading h2 com o texto Page requested not found', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/page-not-found');

    const text = getByRole('heading', { name: /Page requested not found/ });
    expect(text).toBeInTheDocument();
  });

  it('Testa se a página mostra a imagem', () => {
    const { getByAltText, history } = renderWithRouter(<App />);
    const textAlt = 'Pikachu crying because the page requested was not found';

    history.push('/page-not-found');

    const imgAlt = getByAltText(textAlt);

    expect(imgAlt.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
