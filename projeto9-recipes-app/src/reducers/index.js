import { combineReducers } from 'redux';
import login from './login';
import recipes from './recipes';
import { recipe, recipeDrink } from './recipe';

const rootReducer = combineReducers({
  login,
  recipes,
  recipe,
  recipeDrink,
});

export default rootReducer;
