import { ADD_RECIPES } from '../actions';

const INITIAL_STATE = {
  recipes: [],
};

const recipesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_RECIPES:
    return {
      ...state,
      recipes: action.recipes,
    };
  default:
    return state;
  }
};

export default recipesReducer;
