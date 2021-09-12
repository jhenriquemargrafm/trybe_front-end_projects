import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import * as api from '../services/API';

class ExplorarComidasArea extends Component {
  constructor() {
    super();
    this.state = {
      countries: [],
      isFetchDone: false,
      isFetchDone2: false,
      meals: [],
    };
  }

  componentDidMount() {
    this.fetchAPI();
    this.fetchAPIMeals('All');
  }

  async fetchAPI() {
    const getAPI = await api.fetchAPIMealsAreas();
    this.setState({
      countries: getAPI,
      isFetchDone: true,
    });
  }

  fetchMealsByCountry(target) {
    const { value } = target;
    this.fetchAPIMeals(value);
  }

  async fetchAPIMeals(value) {
    let getAPI;
    if (value === 'All') {
      getAPI = await api.fetchAPIFoodList();
    } else {
      getAPI = await api.fetchAPIMealsByArea(value);
    }
    this.setState({
      meals: getAPI,
      isFetchDone2: true,
    });
  }

  render() {
    const title = 'Explorar Origem';
    const { countries, isFetchDone, meals, isFetchDone2 } = this.state;
    const elements = 12;
    return (
      <main>
        { isFetchDone === false ? <div>Carregando...</div> : (
          <div>
            <Header
              title={ title }
            />
            <label htmlFor="countries">
              <select
                data-testid="explore-by-area-dropdown"
                name="countries"
                onChange={ ({ target }) => this.fetchMealsByCountry(target) }
              >
                <option
                  key="All"
                  value="All"
                  data-testid="All-option"
                >
                  All
                </option>
                {countries.map((country) => (
                  <option
                    key={ country.strArea }
                    value={ country.strArea }
                    data-testid={ `${country.strArea}-option` }
                  >
                    {country.strArea}
                  </option>
                ))}
              </select>
            </label>
            { isFetchDone2 === false ? <div>Carregando...</div> : (
              <div>
                { meals.slice(0, elements).map((recipe, index) => (
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
            <Footer />
          </div>
        )}
      </main>
    );
  }
}

export default ExplorarComidasArea;
