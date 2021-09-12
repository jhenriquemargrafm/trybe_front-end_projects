import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

class Perfil extends Component {
  constructor() {
    super();
    this.state = {
      email: 'Carregando...',
    };
  }

  componentDidMount() {
    this.getEmail();
  }

  handleLogOut() {
    localStorage.clear();
  }

  getEmail() {
    const obj = JSON.parse(localStorage.getItem('user'));
    if (obj) {
      this.setState({
        email: obj.email,
      });
    }
  }

  render() {
    const { email } = this.state;
    const title = 'Perfil';
    const lupa = 'desligada';
    return (
      <div>
        <h1 data-testid="page-title">Perfil</h1>
        <Header
          title={ title }
          lupa={ lupa }
        />
        <h2 data-testid="profile-email">{ email }</h2>
        <Link to="/receitas-feitas">
          <button type="button" data-testid="profile-done-btn">Receitas Feitas</button>
        </Link>
        <Link to="/receitas-favoritas">
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ this.handleLogOut }
          >
            Sair
          </button>
        </Link>
        <Footer />
      </div>
    );
  }
}

export default Perfil;
