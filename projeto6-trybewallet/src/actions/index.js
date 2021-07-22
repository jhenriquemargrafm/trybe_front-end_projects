export const ENTER_EMAIL = 'ENTER_EMAIL';

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_CURRENCIES_SUCCESS = 'GET_CURRENCIES_SUCCESS';
export const GET_CURRENCIES_FAILED = 'GET_CURRENCIES_FAILED';

export const TURN_EDIT_BUTTON_ON = 'TURN_EDIT_BUTTON_ON';
export const TURN_EDIT_BUTTON_OFF = 'TURN_EDIT_BUTTON_OFF';
export const CURRENT_ID = 'CURRENT_ID';

export const turnEditButtonOn = () => ({
  type: TURN_EDIT_BUTTON_ON,
});

export const turnEditButtonOff = () => ({
  type: TURN_EDIT_BUTTON_OFF,
});

export const currentId = (id) => ({
  type: CURRENT_ID,
  payload: id,
});

export const enterEmail = (email) => ({
  type: 'ENTER_EMAIL',
  payload: email,
});

export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  payload: expense,
});

export const removeExpense = (id) => ({
  type: 'REMOVE_EXPENSE',
  payload: id,
});

export const editExpense = (expense) => ({
  type: 'EDIT_EXPENSE',
  payload: expense,
});

export const getCurrencies = () => ({
  type: 'GET_CURRENCIES',
});

export const getCurrenciesSuccess = (payload) => ({
  type: 'GET_CURRENCIES_SUCCESS',
  payload,
});

export const getCurrenciesFailed = (payload) => ({
  type: 'GET_CURRENCIES_FAILED',
  payload,
});

export const getCurrenciesThunk = () => async (dispatch) => {
  dispatch(getCurrencies());
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const results = await response.json();
    dispatch(getCurrenciesSuccess(results));
  } catch (error) {
    dispatch(getCurrenciesFailed(error));
  }
};
