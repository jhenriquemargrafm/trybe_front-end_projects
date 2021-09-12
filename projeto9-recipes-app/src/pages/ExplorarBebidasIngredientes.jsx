import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveRecipes } from '../actions';
import Footer from '../components/Footer';
import Header from '../components/Header';
import * as api from '../services/API';

class ExplorarBebidasIngredientes extends Component {
  constructor() {
    super();

    this.state = {
      title: 'Explorar Ingredientes',
      isFetchDone: false,
      lupa: 'desligada',
      Ingredients: [],
    };

    this.fetchAPISearchBar = this.fetchAPIDrinkIngredient.bind(this);
  }

  componentDidMount() {
    this.fetchAPI();
  }

  async fetchAPI() {
    const getAPI = await api.fetchAPIDrinksIngredients();
    getAPI.length = 12;
    this.setState({
      Ingredients: getAPI,
      isFetchDone: true,
    });
  }

  async fetchAPIDrinkIngredient(searchInput) {
    const { fetchRecipes } = this.props;
    const getAPI = await api.fetchAPISearchBarBebidas(searchInput, 'ingredient');
    const ONE_SECOND = 500;
    setTimeout(() => {
      fetchRecipes(getAPI);
    }, ONE_SECOND);
  }

  render() {
    const { title, lupa, Ingredients, isFetchDone } = this.state;
    return (
      <main>
        <Header
          title={ title }
          lupa={ lupa }
        />
        {isFetchDone === false ? <div>Carregando...</div> : (
          <div>
            {Ingredients.map((Ingredient, index) => (
              <div key={ index } data-testid={ `${index}-ingredient-card` }>
                <Link
                  to="/bebidas/"
                  onClick={ () => this.fetchAPIDrinkIngredient(
                    Ingredient.strIngredient1,
                  ) }
                >
                  <img
                    className="photo"
                    src={ `https://www.thecocktaildb.com/images/ingredients/${Ingredient.strIngredient1}-Small.png` }
                    data-testid={ `${index}-card-img` }
                    alt="Imagem da receita"
                  />
                  <p data-testid={ `${index}-card-name` }>{Ingredient.strIngredient1}</p>
                </Link>
              </div>
            ))}
          </div>
        )}
        <Footer />
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchRecipes: (recipes) => dispatch(saveRecipes(recipes)),
});

ExplorarBebidasIngredientes.propTypes = ({
  fetchRecipes: PropTypes.func,
}).isRequired;

export default connect(null, mapDispatchToProps)(ExplorarBebidasIngredientes);
