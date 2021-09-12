import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as api from '../services/API';

class SearchInput extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      option: 'ingredient',
      API: [],
      isFetchDone: false,
      choice: '',
      choiceObj: '',
      choiceObj1: '',
      choiceObj2: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleChange({ target }) {
    const { value } = target;
    this.setState({
      option: value,
    });
  }

  handleInputChange({ target }) {
    const { value } = target;
    this.setState({
      searchInput: value,
    });
  }

  handleSearchClick() {
    const { searchInput, option } = this.state;
    this.fetchAPISearchBar(searchInput, option);
  }

  async fetchAPISearchBar(searchInput, option) {
    const { title } = this.props;
    let getAPI;
    if (title === 'Comidas') {
      getAPI = await api.fetchAPISearchBarComidas(searchInput, option);
      this.setState({
        choice: 'comidas',
        choiceObj: 'idMeal',
        choiceObj1: 'strMealThumb',
        choiceObj2: 'strMeal',
      });
    }
    if (title === 'Bebidas') {
      getAPI = await api.fetchAPISearchBarBebidas(searchInput, option);
      this.setState({
        choice: 'bebidas',
        choiceObj: 'idDrink',
        choiceObj1: 'strDrinkThumb',
        choiceObj2: 'strDrink',
      });
    }
    this.setState({
      API: getAPI,
      isFetchDone: true,
    }, () => {
      const { API } = this.state;
      if (API === null) {
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
    });
  }

  render() {
    const { API, isFetchDone, choice, choiceObj, choiceObj1, choiceObj2 } = this.state;
    const elements = 12;
    return (
      <main>
        <input
          data-testid="search-input"
          name="search-input"
          type="text"
          placeholder="Digite um termo de busca..."
          onChange={ this.handleInputChange }
        />
        <label htmlFor="ingredient-search-radio">
          Ingrediente
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            name="search-radio"
            id="ingredient-search-radio"
            value="ingredient"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="name-search-radio">
          Nome
          <input
            data-testid="name-search-radio"
            type="radio"
            name="search-radio"
            id="name-search-radio"
            value="name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="first-letter-search-radio">
          Primeira letra
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            name="search-radio"
            id="first-letter-search-radio"
            value="firstLetter"
            onChange={ this.handleChange }
          />
        </label>
        <button
          data-testid="exec-search-btn"
          type="button"
          onClick={ () => {
            this.handleSearchClick();
          } }
        >
          Buscar
        </button>
        { isFetchDone === false ? <div>Nenhuma busca foi realizada</div> : (
          <div>
            { API === null ? <div>Nenhuma receita foi encontrada</div> : (
              <div>
                { API.length === 1
                  ? <Redirect to={ `/${choice}/${API[0][choiceObj]}` } /> : (
                    API.slice(0, elements).map((recipe, index) => (
                      <div key={ index } data-testid={ `${index}-recipe-card` }>
                        <Link to={ `/${choice}/${recipe.idDrink}` }>
                          <img
                            className="photo"
                            src={ recipe[choiceObj1] }
                            data-testid={ `${index}-card-img` }
                            alt="Imagem da receita"
                          />
                          <p data-testid={ `${index}-card-name` }>{recipe[choiceObj2]}</p>
                        </Link>
                      </div>
                    ))
                  )}
              </div>
            )}
          </div>
        )}
      </main>
    );
  }
}

export default SearchInput;

SearchInput.propTypes = {
  title: PropTypes.string.isRequired,
};
