import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';
import button from './button';

const rootReducer = combineReducers({
  user,
  wallet,
  button,
});

export default rootReducer;
