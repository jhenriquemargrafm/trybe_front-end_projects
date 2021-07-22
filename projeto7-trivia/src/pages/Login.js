import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
import { getTokenThunk, sendEmail } from '../actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleButton() {
    const { name, email } = this.state;
    const verifyEmail = email.includes('@') && email.includes('.com');
    const verifyName = name !== '';
    if (verifyEmail && verifyName) {
      return false;
    }
    return true;
  }

  render() {
    const { name, email } = this.state;
    const { getToken, sendEmailG } = this.props;
    const isEnabled = this.handleButton();
    return (
      <main>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            SUA VEZ
          </p>
          <form>
            <input
              data-testid="input-player-name"
              type="text"
              name="name"
              placeholder="Digite seu nome"
              value={ name }
              onChange={ this.handleChange }
            />
            <input
              data-testid="input-gravatar-email"
              type="text"
              name="email"
              placeholder="Digite seu email"
              value={ email }
              onChange={ this.handleChange }
            />
            <Link to="/game">
              <button
                type="button"
                data-testid="btn-play"
                disabled={ isEnabled }
                onClick={ () => {
                  getToken();
                  sendEmailG(email, name);
                } }
              >
                Jogar
              </button>
            </Link>
            <Link to="/settings">
              <button type="button" data-testid="btn-settings">Configuração</button>
            </Link>
          </form>
        </header>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(getTokenThunk()),
  sendEmailG: (email, name) => dispatch(sendEmail(email, name)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  getToken: PropTypes.func,
  addPlayerFeedback: PropTypes.func,
}.isRequired;
