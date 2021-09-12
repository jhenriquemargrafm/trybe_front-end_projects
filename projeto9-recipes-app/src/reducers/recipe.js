const INITIAL_STATE = {
  currentRecipes: {
    meals: {},
    cocktails: {},
  },
  doneRecipes: [],
  favoriteRecipes: [],
};

export const recipe = (state = INITIAL_STATE, action) => {
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  switch (action.type) {
  case 'ADD_RECIPE_ONGOING':
    if (inProgress === null) {
      const obj = {
        cocktails: {
        },
        meals: {
          controle: '999999999999',
          [action.payload]: [],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    } else {
      const obj = {
        ...inProgress,
        meals: {
          ...inProgress.meals,
          [action.payload]: [],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    }
    return state;
  case 'ADD_RECIPE_FAVORITE':
    return state;
  case 'ADD_RECIPE_DONE':
    delete inProgress.meals[action.payload.id];
    console.log(action.payload.id);
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    if (doneRecipes === null) {
      localStorage.setItem('doneRecipes', JSON.stringify([action.payload]));
    } else {
      const array = [
        ...doneRecipes,
        action.payload,
      ];
      localStorage.setItem('doneRecipes', JSON.stringify(array));
    }
    return state;
  default:
    return state;
  }
};

export const recipeDrink = (state = INITIAL_STATE, action) => {
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  switch (action.type) {
  case 'ADD_DRINK_RECIPE_ONGOING':
    if (inProgress === null) {
      const obj = {
        cocktails: {
          controle: '999999999999',
          [action.payload]: [],
        },
        meals: {
          controle: '999999999999',
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    } else {
      const obj = {
        ...inProgress,
        cocktails: {
          ...inProgress.cocktails,
          [action.payload]: [],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    }
    return state;
  case 'ADD_DRINK_RECIPE_DONE':
    delete inProgress.cocktails[action.payload.id];
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    if (doneRecipes === null) {
      localStorage.setItem('doneRecipes', JSON.stringify([action.payload]));
    } else {
      const array = [
        ...doneRecipes,
        action.payload,
      ];
      localStorage.setItem('doneRecipes', JSON.stringify(array));
    }
    return state;
  default:
    return state;
  }
};

// export default recipe;

// let inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
//  console.log(inProgress);
// if (inProgress === null) {
// const obj = [action.payload];
// console.log(array);
// localStorage.setItem('inProgressRecipes', JSON.stringify(array));
// } else {
// inProgress.push(action.payload);
// localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
// }
