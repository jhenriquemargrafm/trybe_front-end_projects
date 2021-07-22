import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrenciesThunk } from '../actions';
import * as action from '../actions';
import Expense from './Expense';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '0',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange(event) {
    const { target: { value, name } } = event;
    this.setState({ [name]: value });
  }

  async handleSubmit(expense) {
    const { addExpense } = this.props;
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    expense.exchangeRates = data;
    addExpense(expense);
  }

  async handleEditId() {
    const { value, description, currency, method, tag } = this.state;
    const { editExpense, turnEditButtonOff, expenses } = this.props;
    const { stateId } = this.props;
    const lookedExpense = expenses.find((expense) => (expense.id === stateId));
    const expense = {
      value,
      description,
      currency,
      method,
      tag,
      id: stateId,
      exchangeRates: lookedExpense.exchangeRates,
    };
    editExpense(expense);
    turnEditButtonOff();
  }

  renderFieldValor() {
    return (
      <label htmlFor="value">
        Valor
        <input
          name="value"
          id="value"
          data-testid="value-input"
          type="text"
          onChange={ (e) => this.handleChange(e) }
        />
      </label>
    );
  }

  renderFieldDescricao() {
    return (
      <label htmlFor="description">
        Descrição
        <input
          type="text"
          name="description"
          id="description"
          data-testid="description-input"
          onChange={ (e) => this.handleChange(e) }
        />
      </label>
    );
  }

  renderFieldMoeda() {
    const { currencies } = this.props;
    const crr = currencies.filter((currency) => currency !== 'USDT');
    return (
      <label htmlFor="currency">
        Moeda
        <select
          name="currency"
          id="currency"
          data-testid="currency-input"
          onChange={ (e) => this.handleChange(e) }
        >
          { crr.map((currency) => (
            <option key={ currency } value={ currency }>
              { currency }
            </option>))}
        </select>
      </label>
    );
  }

  renderFieldMetodo() {
    return (
      <label htmlFor="method">
        Método de Pagamento
        <select
          name="method"
          id="method"
          data-testid="method-input"
          onChange={ (e) => this.handleChange(e) }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  renderFieldTag() {
    return (
      <label htmlFor="tag">
        Tag
        <select
          name="tag"
          id="tag"
          data-testid="tag-input"
          onChange={ (e) => this.handleChange(e) }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { expenses, addButton, editButton } = this.props;
    const lastExpense = expenses[expenses.length - 1];
    const expense = {
      value,
      description,
      currency,
      method,
      tag,
      id: lastExpense ? lastExpense.id + 1 : 0,
    };
    return (
      <div>
        <form>
          { this.renderFieldValor()}
          { this.renderFieldDescricao()}
          { this.renderFieldMoeda()}
          { this.renderFieldMetodo()}
          { this.renderFieldTag()}
        </form>
        <button
          type="button"
          disabled={ addButton }
          onClick={ () => {
            this.handleSubmit(expense);
          } }
        >
          Adicionar despesa
        </button>
        <button
          type="button"
          disabled={ editButton }
          onClick={ () => {
            this.handleEditId();
          } }
        >
          Editar despesa
        </button>
        <Expense />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  addButton: state.button.addButton,
  editButton: state.button.editButton,
  stateId: state.button.stateId,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(getCurrenciesThunk()),
  addExpense: (expense) => dispatch(action.addExpense(expense)),
  editExpense: (expense) => dispatch(action.editExpense(expense)),
  turnEditButtonOff: () => dispatch(action.turnEditButtonOff()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

Header.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.array).isRequired,
  addExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
  turnEditButtonOff: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.array).isRequired,
  addButton: PropTypes.bool.isRequired,
  editButton: PropTypes.bool.isRequired,
  stateId: PropTypes.string.isRequired,
};
