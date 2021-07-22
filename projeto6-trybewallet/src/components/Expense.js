import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as action from '../actions';

class Expense extends React.Component {
  render() {
    const { expenses, deleteExpense, turnEditButtonOn, currentId } = this.props;
    const tableHeader = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    return (
      <table>
        <thead>
          <tr>
            { tableHeader.map((string, index) => (<th key={ index }>{ string }</th>)) }
          </tr>
        </thead>
        <tbody>
          { expenses.map((
            { description, tag, method, value, exchangeRates, currency, id },
          ) => (
            <tr key={ id }>
              <td role="cell">{ description }</td>
              <td role="cell">{ tag }</td>
              <td role="cell">{ method }</td>
              <td role="cell">{ value }</td>
              <td role="cell">{ exchangeRates[currency].name.split('/')[0] }</td>
              <td role="cell">{ Number(exchangeRates[currency].ask).toFixed(2) }</td>
              <td>{ Number(value * exchangeRates[currency].ask).toFixed(2) }</td>
              <td role="cell">Real</td>
              <td>
                <button
                  type="button"
                  id="edit-btn"
                  data-testid="edit-btn"
                  onClick={ () => {
                    turnEditButtonOn();
                    currentId(id);
                  } }
                >
                  EDITAR
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => deleteExpense(id) }
                >
                  DELETE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(action.removeExpense(id)),
  turnEditButtonOn: () => dispatch(action.turnEditButtonOn()),
  currentId: (id) => dispatch(action.currentId(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Expense);

Expense.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
  turnEditButtonOn: PropTypes.func.isRequired,
  currentId: PropTypes.func.isRequired,
};
