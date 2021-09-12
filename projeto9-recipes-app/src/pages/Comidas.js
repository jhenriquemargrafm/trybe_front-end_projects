import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Categories from '../components/Categories';
import { saveRecipes } from '../actions';
import * as api from '../services/API';

class Comidas extends Component {
  constructor() {
    super();
    this.state = {
      title: 'Comidas',
      isFetchDone: false,
      lupa: 'ligada',
      modus: 'list',
      filter: false,
      selectedFilter: 'nenhum',
    };
    this.switchModus = this.switchModus.bind(this);
    this.filterByCategory = this.filterByCategory.bind(this);
    this.listAll = this.listAll.bind(this);
  }

  componentDidMount() {
    this.fetchAPI();
  }

  async fetchAPI() {
    const { fetchRecipes } = this.props;
    const recipes = await api.fetchAPIFoodList();
    fetchRecipes(recipes);
    this.setState({
      isFetchDone: true,
    });
  }

  switchModus() {
    const { modus } = this.state;
    if (modus === 'list') {
      this.setState({
        modus: 'search',
      });
    } else {
      this.setState({
        modus: 'list',
      });
    }
  }

  async listAll() {
    const { fetchRecipes } = this.props;
    const recipes = await api.fetchAPIFoodList();
    fetchRecipes(recipes);
    this.fetchAPI();
    this.setState({
      filter: false,
      selectedFilter: 'nenhum',
    });
  }

  filterByCategory(event) {
    const { value } = event.target;
    this.fetchAPIByCategory(value);
  }

  async fetchAPIByCategory(category) {
    const { filter, selectedFilter } = this.state;
    const { fetchRecipes } = this.props;
    const getAPI = await api.fetchAPIByFoodCategory(category);
    if (filter === false || selectedFilter !== category) {
      this.setState({
        filter: true,
        selectedFilter: category,
      });
      fetchRecipes(getAPI);
    } else {
      this.listAll();
    }
  }

  render() {
    const { title, isFetchDone, lupa, modus } = this.state;
    const { recipes } = this.props;
    const elements = 12;
    return (
      <div>
        <Header
          title={ title }
          lupa={ lupa }
          switchModus={ this.switchModus }
          modus={ modus }
        />
        { isFetchDone === false ? <div>Carregando...</div> : (
          <div>
            { modus === 'search' ? <div>...</div> : (
              <div>
                <Categories
                  title={ title }
                  filterByCategory={ this.filterByCategory }
                  listAll={ this.listAll }
                />
                {recipes.slice(0, elements).map((recipe, index) => (
                  <div key={ index } data-testid={ `${index}-recipe-card` }>
                    <Link to={ `/comidas/${recipe.idMeal}` }>
                      <img
                        className="photo"
                        src={ recipe.strMealThumb }
                        data-testid={ `${index}-card-img` }
                        alt="Imagem da receita"
                      />
                      <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  recipes: state.recipes.recipes,
});

const mapDispatchToProps = (dispatch) => ({
  fetchRecipes: (recipes) => dispatch(saveRecipes(recipes)),
});

Comidas.propTypes = ({
  fetchRecipes: PropTypes.func,
  recipes: PropTypes.func,
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Comidas);
