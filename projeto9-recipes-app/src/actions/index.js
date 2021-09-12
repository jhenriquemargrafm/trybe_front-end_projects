export const SEND_LOGIN_INFO = 'SEND_LOGIN_INFO';
export const ADD_RECIPES = 'ADD_RECIPES';

export const ADD_RECIPE_ONGOING = 'ADD_RECIPE_ONGOING';
export const ADD_DRINK_RECIPE_ONGOING = 'ADD_DRINK_RECIPE_ONGOING';
export const ADD_RECIPE_DONE = 'ADD_RECIPE_DONE';
export const ADD_DRINK_RECIPE_DONE = 'ADD_DRINK_RECIPE_DONE';
export const ADD_RECIPE_FAVORITE = 'ADD_RECIPE_FAVORITE';

export const sendLoginInfo = (email, password) => ({
  type: SEND_LOGIN_INFO,
  payload: email,
  payload2: password,
});

export const addRecipeOngoing = (id, list) => ({
  type: ADD_RECIPE_ONGOING,
  payload: id,
  payload2: list,
});

export const addDrinkRecipeOngoing = (id, list) => ({
  type: ADD_DRINK_RECIPE_ONGOING,
  payload: id,
  payload2: list,
});

export const addRecipeFavorite = (obj) => ({
  type: ADD_RECIPE_FAVORITE,
  payload: obj,
});

export const addRecipeDone = (obj) => ({
  type: ADD_RECIPE_DONE,
  payload: obj,
});

export const addDrinkRecipeDone = (obj) => ({
  type: ADD_DRINK_RECIPE_DONE,
  payload: obj,
});

export const saveRecipes = (recipes) => ({
  type: ADD_RECIPES,
  recipes,
});
