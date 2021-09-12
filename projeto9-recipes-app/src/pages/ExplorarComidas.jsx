import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import * as api from '../services/API';

class ExplorarComidas extends Component {
  constructor() {
    super();

    this.state = {
      meals: [],
    };
  }

  componentDidMount() {
    this.fetchAPI();
  }

  async fetchAPI() {
    const getAPI = await api.fetchAPIRandomMeal();
    const { idMeal } = getAPI[0];
    this.setState({
      meals: idMeal,
    });
  }

  render() {
    const title = 'Explorar Comidas';
    const lupa = 'desligada';
    const { meals } = this.state;
    return (
      <main>
        <Header
          title={ title }
          lupa={ lupa }
        />
        <Link to="/explorar/comidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button
            type="button"
            data-testid="explore-by-area"
          >
            Por Local de Origem
          </button>
        </Link>
        <Link
          to={ {
            pathname: `/comidas/${meals}`,
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

export default ExplorarComidas;
