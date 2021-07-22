import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  render() {
    // Definição das constantes para cada elemento na seção das buscas de filmes (Fundo Azul)
    const { searchText, onSearchTextChange } = this.props;
    const { bookmarkedOnly, onBookmarkedChange } = this.props;
    const { selectedGenre, onSelectedGenreChange } = this.props;
    return (
      <div className="bodySearchBar">
        <form data-testid="search-bar-form">
          <label data-testid="text-input-label" htmlFor="text-input-label">
            Inclui o texto:
            <input
              data-testid="text-input"
              name="searchText"
              onChange={ onSearchTextChange }
              value={ searchText }
              type="text"
            />
          </label>
          <label data-testid="checkbox-input-label" htmlFor="checkbox-input-label">
            Mostrar somente favoritos
            <input
              data-testid="checkbox-input"
              name="bookmarkedOnly"
              onChange={ onBookmarkedChange }
              checked={ bookmarkedOnly }
              type="checkbox"
            />
          </label>
          <label data-testid="select-input-label" htmlFor="select-input-label">
            Filtrar por gênero
            <select
              data-testid="select-input"
              name="selectedGenre"
              onChange={ onSelectedGenreChange }
              value={ selectedGenre }
            >
              <option data-testid="select-option" value="">Todos</option>
              <option data-testid="select-option" value="action">Ação</option>
              <option data-testid="select-option" value="comedy">Comédia</option>
              <option data-testid="select-option" value="thriller">Suspense</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

SearchBar.propTypes = {
  searchText: PropTypes.string.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
  bookmarkedOnly: PropTypes.bool.isRequired,
  onBookmarkedChange: PropTypes.func.isRequired,
  selectedGenre: PropTypes.string.isRequired,
  onSelectedGenreChange: PropTypes.func.isRequired,
};

export default SearchBar;
