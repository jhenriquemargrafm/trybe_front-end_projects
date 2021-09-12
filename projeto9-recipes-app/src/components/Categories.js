import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/API';

class Categories extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      isFetchDone: false,
    };
  }

  componentDidMount() {
    this.fetchAPI();
  }

  async fetchAPI() {
    const { title } = this.props;
    let getAPI;
    if (title === 'Comidas') {
      getAPI = await api.fetchAPIFoodCategories();
      this.setState({
        categories: getAPI,
        isFetchDone: true,
      });
    }
    if (title === 'Bebidas') {
      getAPI = await api.fetchAPIDrinkCategories();
      this.setState({
        categories: getAPI,
        isFetchDone: true,
      });
    }
  }

  render() {
    const { isFetchDone, categories } = this.state;
    const { filterByCategory, listAll } = this.props;
    const elements = 5;
    return (
      <div>
        { isFetchDone === false ? <div>Carregando categorias...</div> : (
          <div>
            <button
              type="button"
              key="7"
              value="all"
              onClick={ listAll }
              data-testid="All-category-filter"
            >
              All
            </button>
            {categories.slice(0, elements).map((category, index) => (
              <button
                type="button"
                key={ index }
                value={ category.strCategory }
                data-testid={ `${category.strCategory}-category-filter` }
                onClick={ filterByCategory }
              >
                {category.strCategory}
              </button>
            ))}

          </div>
        )}
      </div>
    );
  }
}

export default Categories;

Categories.propTypes = {
  title: PropTypes.string.isRequired,
  filterByCategory: PropTypes.func.isRequired,
  listAll: PropTypes.func.isRequired,
};
