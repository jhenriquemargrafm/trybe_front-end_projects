const INITIAL_STATE = {
  email: '',
  password: '',
};

const sendLoginInfo = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SEND_LOGIN_INFO':
    localStorage.setItem('user', JSON.stringify({ email: action.payload }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    return {
      ...state,
      email: action.payload,
      password: action.payload2,
    };
  default:
    return state;
  }
};

export default sendLoginInfo;
