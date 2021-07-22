import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Form extends React.Component {
  render() {
    const { userEmail, walletExpenses } = this.props;
    const noExpenses = () => {
      if (walletExpenses.length === 0) {
        return true;
      }
      return false;
    };
    return (
      <div>
        <div data-testid="email-field">
          Email:
          {' '}
          {userEmail}
        </div>
        <section data-testid="total-field">
          Total:
          {' '}
          { noExpenses() ? 0 : walletExpenses.reduce((acc, expense) => {
            const conversion = Number(expense.exchangeRates[expense.currency].ask);
            acc += parseFloat(conversion) * parseFloat(Number(expense.value));
            return acc;
          }, 0).toFixed(2) }
        </section>
        <section data-testid="header-currency-field">
          Moeda atual:BRL
        </section>
      </div>
    );
  }
}

Form.propTypes = {
  userEmail: PropTypes.string.isRequired,
  walletExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  walletExpenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Form);
