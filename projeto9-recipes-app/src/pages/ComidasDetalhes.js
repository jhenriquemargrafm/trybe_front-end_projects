import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Carousel from './Carousel';
import { addRecipeOngoing } from '../actions';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import Iframe from '../components/Iframe';

class ComidasDetalhes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mealDetails: {},
      ingredientList: [],
      finalList: [],
      isMealDone: false,
      isMealInProgress: false,
      isALreadyFavorited: false,
    };

    this.recipeDetailsFetchAPI = this.recipeDetailsFetchAPI.bind(this);
    this.CopyToClipboard = this.CopyToClipboard.bind(this);
    this.handleOnClickLike = this.handleOnClickLike.bind(this);
  }

  componentDidMount() {
    this.recipeDetailsFetchAPI();
    this.fetchInProgressRecipes();
    this.fetchDoneRecipes();
  }

  handleOnClickLike() {
    const { mealDetails, isALreadyFavorited } = this.state;
    const obj = {
      id: mealDetails.idMeal,
      type: 'comida',
      area: mealDetails.strArea,
      category: mealDetails.strCategory,
      alcoholicOrNot: '',
      name: mealDetails.strMeal,
      image: mealDetails.strMealThumb,
    };
    const favoritedRecipes = JSON.parse(
      localStorage.getItem('favoriteRecipes'),
    );
    if (!isALreadyFavorited && favoritedRecipes !== null) {
      favoritedRecipes.push(obj);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoritedRecipes));
    }
    if (favoritedRecipes === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([obj]));
    }
    if (isALreadyFavorited) {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify(
          favoritedRecipes.filter((e) => e.id !== mealDetails.idMeal),
        ),
      );
    }
    this.setState({
      isALreadyFavorited: !isALreadyFavorited,
    });
  }

  fetchDoneRecipes() {
    const { match: { params: { id } } } = this.props;
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes !== null) {
      const filter = doneRecipes.filter((recipe) => recipe.id === id);
      if (filter.length >= 1) {
        this.setState({
          isMealDone: true,
        });
      }
    }
  }

  CopyToClipboard() { // https://orclqa.com/copy-url-clipboard/
    const inputc = document.body.appendChild(document.createElement('input'));
    navigator.clipboard.writeText(window.location.href);
    document.execCommand('copy');
    inputc.parentNode.removeChild(inputc);
    this.setState({
      showSpan: true,
    }, () => {
      const ONE_SECOND = 2000;
      setTimeout(() => {
        this.setState({
          showSpan: false,
        });
      }, ONE_SECOND);
    });
  }

  fetchInProgressRecipes() {
    const { match: { params: { id } } } = this.props;
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes !== null) {
      const inProgress = Object.hasOwnProperty.call(
        inProgressRecipes.meals,
        id,
      );
      this.setState({
        isMealInProgress: inProgress,
      });
    }
  }

  async recipeDetailsFetchAPI() {
    const { match: { params: { id } },
    } = this.props;
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    const ingredientListBuffer = [];
    Object.keys(data.meals[0]).forEach((e) => {
      if (e.includes('strIngredient')) {
        return ingredientListBuffer.push(e);
      }
    });
    this.setState({
      mealDetails: data.meals[0],
      ingredientList: ingredientListBuffer,
    }, () => {
      const { ingredientList, mealDetails } = this.state;
      const doneList = ingredientList
        .map((e) => (mealDetails[e]
          ? `${mealDetails[e]} - ${
            mealDetails[`strMeasure${e.match(/\d+/)[0]}`]
          }`
          : null)).filter(Boolean);
      this.setState({ finalList: doneList });
    });
    const favoritedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const { mealDetails } = this.state;
    if (favoritedRecipes !== null
      && favoritedRecipes.some((e) => e.id === mealDetails.idMeal)
    ) {
      this.setState({ isALreadyFavorited: true });
    }
  }

  render() {
    const {
      mealDetails, ingredientList, finalList,
      isMealDone, isMealInProgress,
      isALreadyFavorited, showSpan } = this.state;
    const { addRecipeCurr, match: { params: { id } } } = this.props;
    const { strMealThumb, strMeal, strCategory, strInstructions,
      strYoutube } = mealDetails;
    return (
      <div className="food-details">
        <img
          className="recipe-photo"
          data-testid="recipe-photo"
          alt={ strMealThumb }
          src={ strMealThumb }
        />
        <button
          type="button"
          data-testid="share-btn"
          onClick={ () => this.CopyToClipboard() }
        >
          <img src={ shareIcon } alt="icone botão" />
        </button>
        <span style={ { display: showSpan ? 'inline' : 'none' } }>Link copiado!</span>
        <button
          type="button"
          data-testid="favorite-btn"
          src={ isALreadyFavorited ? blackHeartIcon : whiteHeartIcon }
          onClick={ () => this.handleOnClickLike() }
        >
          <img
            src={ isALreadyFavorited ? blackHeartIcon : whiteHeartIcon }
            alt={ `liked? ${isALreadyFavorited}` }
          />
        </button>
        <Link to="/comidas">
          <button type="button">Voltar para página de comidas</button>
        </Link>
        <h1 data-testid="recipe-title">{strMeal}</h1>
        <p data-testid="recipe-category">{strCategory}</p>
        <span>Ingredients</span>
        <ul>
          {ingredientList.map((e, index) => (mealDetails[e] ? (
            <li key={ e } data-testid={ `${index}-ingredient-name-and-measure` }>
              {mealDetails[e]}
              {' '}
              -
              {' '}
              {mealDetails[`strMeasure${e.match(/\d+/)[0]}`]}
            </li>
          ) : null))}
        </ul>
        <span>Instructions</span>
        <section id="instructions" data-testid="instructions">
          {strInstructions}
        </section>
        <Iframe strMeal={ strMeal } strYoutube={ strYoutube } />
        <Carousel detailType="ComidasDetalhes" />
        {isMealDone ? (
          <div>...</div>
        ) : (
          <Link
            to={ { pathname: `/comidas/${id}/in-progress` } }
          >
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="start-recipe"
              onClick={ () => addRecipeCurr(mealDetails.idMeal, finalList) }
            >
              Iniciar Receita
            </button>
          </Link>
        )}
        {!isMealInProgress ? (<div>...</div>) : (
          <Link
            to={ { pathname: `/comidas/${id}/in-progress` } }
          >
            <button
              type="button"
              className="start-recipe"
              data-testid="start-recipe-btn"
            >
              Continuar Receita
            </button>
          </Link>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addRecipeCurr: (id, list) => dispatch(addRecipeOngoing(id, list)),
});

export default connect(null, mapDispatchToProps)(ComidasDetalhes);

ComidasDetalhes.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string.isRequired }),
  }),
  addRecipeCurr: PropTypes.func,
}.isRequired;
