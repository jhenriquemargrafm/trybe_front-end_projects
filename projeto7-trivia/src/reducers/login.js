import md5 from 'crypto-js/md5';

const INITIAL_STATE = {
  email: '',
  hash: '',
  name: '',
};

const email = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SEND_EMAIL':
    return {
      ...state,
      email: action.payload,
      hash: md5(action.payload).toString(),
      name: action.payload2,
    };
  default:
    return state;
  }
};

export default email;
