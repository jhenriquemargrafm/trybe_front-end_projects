import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Carousel from './Carousel';
import { addDrinkRecipeOngoing } from '../actions';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

class BebidasDetalhes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drinkDetails: {},
      ingredientList: [],
      finalList: [],
      isMealDone: false,
      isMealInProgress: false,
      isALreadyFavorited: false,
    };

    this.drinkDetailsFetchAPI = this.drinkDetailsFetchAPI.bind(this);
    this.CopyToClipboard = this.CopyToClipboard.bind(this);
    this.handleOnClickLike = this.handleOnClickLike.bind(this);
  }

  componentDidMount() {
    this.drinkDetailsFetchAPI();
    this.fetchInProgressRecipes();
    this.fetchDoneRecipes();
  }

  handleOnClickLike() {
    const { drinkDetails, isALreadyFavorited } = this.state;
    const obj = {
      id: drinkDetails.idDrink,
      type: 'bebida',
      area: '',
      category: drinkDetails.strCategory,
      alcoholicOrNot: drinkDetails.strAlcoholic,
      name: drinkDetails.strDrink,
      image: drinkDetails.strDrinkThumb,
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
          favoritedRecipes.filter((e) => e.id !== drinkDetails.idDrink),
        ),
      );
    }
    this.setState({
      isALreadyFavorited: !isALreadyFavorited,
    });
  }

  fetchInProgressRecipes() {
    const { match: { params: { id } } } = this.props;
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes !== null) {
      const inProgress = Object.hasOwnProperty.call(inProgressRecipes.cocktails, id);
      this.setState({
        isMealInProgress: inProgress,
      });
    }
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

  async drinkDetailsFetchAPI() {
    const { match: { params: { id } } } = this.props;
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
    );
    const data = await response.json();
    const ingredientListBuffer = [];
    Object.keys(data.drinks[0]).forEach((e) => {
      if (e.includes('strIngredient')) {
        return ingredientListBuffer.push(e);
      }
    });
    this.setState({
      drinkDetails: data.drinks[0],
      ingredientList: ingredientListBuffer,
    }, () => {
      const { ingredientList, drinkDetails } = this.state;
      const doneList = ingredientList.map((e) => (drinkDetails[e]
        ? `${drinkDetails[e]} - ${drinkDetails[`strMeasure${e.match(/\d+/)[0]}`]}`
        : null)).filter(Boolean);
      this.setState({
        finalList: doneList,
      });
    });
    const favoritedRecipes = JSON.parse(
      localStorage.getItem('favoriteRecipes'),
    );
    const { drinkDetails } = this.state;
    if (
      favoritedRecipes !== null
      && favoritedRecipes.some((e) => e.id === drinkDetails.idDrink)
    ) {
      this.setState({
        isALreadyFavorited: true,
      });
    }
  }

  render() {
    const { drinkDetails, ingredientList, finalList, isMealDone, showSpan,
      isMealInProgress, isALreadyFavorited } = this.state;
    const { addDrinkRecipeCurr, match: { params: { id } } } = this.props;
    const { strDrink, strDrinkThumb, strAlcoholic, strInstructions } = drinkDetails;
    return (
      <div>
        <img
          data-testid="recipe-photo"
          className="recipe-photo"
          alt={ `${strDrink}` }
          src={ strDrinkThumb }
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
        <Link to="/bebidas">
          <button type="button">
            Voltar para página de bebidas
          </button>
        </Link>
        <h1 data-testid="recipe-title">{strDrink}</h1>
        <p data-testid="recipe-category">{strAlcoholic}</p>
        <span>Ingredients</span>
        <ul>
          {ingredientList.map((e, index) => (drinkDetails[e] ? (
            <li key={ e } data-testid={ `${index}-ingredient-name-and-measure` }>
              {drinkDetails[e]}
              {drinkDetails[`strMeasure${e.match(/\d+/)[0]}`]}
            </li>
          ) : null))}
        </ul>
        <span>Instructions</span>
        <section id="instructions" data-testid="instructions">
          {strInstructions}
        </section>
        <Carousel detailType="BebidasDetalhes" />
        { isMealDone ? <div>...</div> : (
          <Link
            to={ {
              pathname: `/bebidas/${id}/in-progress`,
            } }
          >
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="start-recipe"
              onClick={ () => addDrinkRecipeCurr(drinkDetails.idDrink, finalList) }
            >
              Iniciar Receita
            </button>
          </Link>
        )}
        { !isMealInProgress ? <div>...</div> : (
          <Link
            to={ {
              pathname: `/bebidas/${id}/in-progress`,
            } }
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
  addDrinkRecipeCurr: (id, list) => dispatch(addDrinkRecipeOngoing(id, list)),
});

export default connect(null, mapDispatchToProps)(BebidasDetalhes);

BebidasDetalhes.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
  addRecipeCurr: PropTypes.func,
}.isRequired;
