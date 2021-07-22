import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('Testes do componente App', () => {
  it('Testa o caminho /.', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText(/Pokédex/i);

    expect(home).toBeInTheDocument();
  });

  it('Teste se há o conjunto de links.', () => {
    const { getByRole } = renderWithRouter(<App />);
    const navigation = getByRole('navigation');
    expect(navigation).toBeInTheDocument();

    const linkHome = getByRole('link', { name: /Home/i });
    expect(linkHome).toBeInTheDocument();

    const linkAbout = getByRole('link', { name: /About/i });
    expect(linkAbout).toBeInTheDocument();

    const linkFavorite = getByRole('link', { name: /Favorite/i });
    expect(linkFavorite).toBeInTheDocument();
  });

  it('Vai para / quando clica na Home', () => {
    const { getByText, history: { location: { pathname } } } = renderWithRouter(<App />);
    userEvent.click(getByText(/Home/i));
    expect(pathname).toBe('/');

    const home = getByText(/Pokédex/i);
    expect(home).toBeInTheDocument();
  });

  it('Vai para /about quando clica em About ', () => {
    const { getByText, history } = renderWithRouter(<App />);
    userEvent.click(getByText(/About/i));

    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const about = getByText(/About Pokédex/i);
    expect(about).toBeInTheDocument();
  });

  it('Vai para /favorites', () => {
    const { getByText, getByRole, history } = renderWithRouter(<App />);
    userEvent.click(getByText(/Favorite pokémons/i));

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const favorite = getByRole('heading', { name: /Favorite pokémons/i });
    expect(favorite).toBeInTheDocument();
  });

  it('Página desconhecida vai para Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/page-not-found');

    const notFound = getByText(/Page requested not found/);
    expect(notFound).toBeInTheDocument();
  });
});
