export async function fetchAPISearchBarComidas(searchInput, option) {
  if (option === 'ingredient') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`);
    const data = await response.json();
    return data.meals;
  }

  if (option === 'name') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
    const data = await response.json();
    return data.meals;
  }

  if (option === 'firstLetter') {
    if (searchInput.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`);
    const data = await response.json();
    return data.meals;
  }
}

export async function fetchAPISearchBarBebidas(searchInput, option) {
  if (option === 'ingredient') {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`);
    const data = await response.json();
    return data.drinks;
  }

  if (option === 'name') {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`);
    const data = await response.json();
    return data.drinks;
  }

  if (option === 'firstLetter') {
    if (searchInput.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`);
    const data = await response.json();
    return data.drinks;
  }
}

export async function fetchAPIFoodList() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data.meals;
}

export async function fetchAPIDrinkList() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data.drinks;
}

export async function fetchMealDetails(idMeal) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
  const data = await response.json();
  return data.meals;
}

export async function fetchDrinkDetails(idDrink) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idDrink}`);
  const data = await response.json();
  return data.drinks;
}

export async function fetchAPIRandomMeal() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const data = await response.json();
  return data.meals;
}

export async function fetchAPIFoodCategories() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  return data.meals;
}

export async function fetchAPIRandomCocktail() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const data = await response.json();
  return data.drinks;
}

export async function fetchAPIDrinkCategories() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  return data.drinks;
}

export async function fetchAPIByFoodCategory(category) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();
  return data.meals;
}

export async function fetchAPIByDrinkCategory(category) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();
  return data.drinks;
}

export async function fetchAPIIngredients() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const data = await response.json();
  return data.meals;
}

export async function fetchAPIMealsAreas() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const data = await response.json();
  return data.meals;
}

export async function fetchAPIDrinksIngredients() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
  const data = await response.json();
  return data.drinks;
}

export async function fetchAPIMealsByArea(country) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`);
  const data = await response.json();
  return data.meals;
}
