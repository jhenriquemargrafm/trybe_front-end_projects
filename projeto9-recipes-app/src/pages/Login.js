import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { sendLoginInfo } from '../actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
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
    const { email, password } = this.state;
    const verifyEmail = email.includes('@') && email.includes('.com');
    const min = 6;
    if (verifyEmail && password.length > min) {
      return false;
    }
    return true;
  }

  render() {
    const { email, password } = this.state;
    const { sendLogin } = this.props;
    const isEnabled = this.handleButton();
    return (
      <main>
        <header className="App-header">
          <form>
            <input
              data-testid="email-input"
              type="text"
              name="email"
              placeholder="Digite seu email"
              value={ email }
              onChange={ this.handleChange }
            />
            <input
              data-testid="password-input"
              type="password"
              name="password"
              placeholder="Digite sua senha"
              value={ password }
              onChange={ this.handleChange }
            />
            <Link to="/comidas">
              <button
                type="button"
                data-testid="login-submit-btn"
                disabled={ isEnabled }
                onClick={ () => {
                  sendLogin(email, password);
                } }
              >
                Login
              </button>
            </Link>
          </form>
        </header>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendLogin: (email, password) => dispatch(sendLoginInfo(email, password)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  getToken: PropTypes.func,
  addPlayerFeedback: PropTypes.func,
}.isRequired;
