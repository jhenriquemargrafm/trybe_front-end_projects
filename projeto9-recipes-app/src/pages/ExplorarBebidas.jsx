import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import * as api from '../services/API';

class ExplorarBebidas extends Component {
  constructor() {
    super();

    this.state = {
      cocktail: [],
    };
  }

  componentDidMount() {
    this.fetchAPI();
  }

  async fetchAPI() {
    const getAPI = await api.fetchAPIRandomCocktail();
    const { idDrink } = getAPI[0];
    this.setState({
      cocktail: idDrink,
    });
  }

  render() {
    const title = 'Explorar Bebidas';
    const lupa = 'desligada';
    const { cocktail } = this.state;
    return (
      <main>
        <Header
          title={ title }
          lupa={ lupa }
        />
        <Link to="/explorar/bebidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link
          to={ {
            pathname: `/bebidas/${cocktail}`,
          } }
        >
          <button
            type="button"
            data-testid="explore-surprise"
          >
            Me Surpreenda!
          </button>
        </Link>
        <Footer />
      </main>
    );
  }
}

export default ExplorarBebidas;
