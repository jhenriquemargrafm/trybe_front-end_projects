import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import * as action from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      disabledButton: true,
      shouldRedirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
  }

  redirect() {
    this.setState({ shouldRedirect: true });
  }

  validateLogin() {
    const minimumLength = 5;
    const { email, password } = this.state;
    const checkedEmail = email.includes('@') && email.includes('.com');
    const checkedPassword = password.length >= minimumLength;
    const result = checkedEmail && checkedPassword;
    this.setState({ disabledButton: !result });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.validateLogin();
  }

  render() {
    const { email, disabledButton, shouldRedirect } = this.state;
    const { sendEmail } = this.props;
    if (shouldRedirect) return <Redirect to="/carteira" />;
    return (
      <div>
        <div>
          <h1>Login</h1>
        </div>
        <form>
          <label htmlFor="email">
            <input
              placeholder="Email"
              name="email"
              type="email"
              data-testid="email-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password">
            <input
              placeholder="Senha"
              name="password"
              type="password"
              data-testid="password-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            disabled={ disabledButton }
            onClick={ () => {
              this.redirect();
              sendEmail(email);
            } }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendEmail: (state) => dispatch(action.enterEmail(state)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  sendEmail: PropTypes.func.isRequired,
};
