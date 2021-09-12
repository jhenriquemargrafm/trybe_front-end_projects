import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addDrinkRecipeDone } from '../actions';
import SectionBebidasEmProgresso from '../components/SectionBebidasEmProgresso';

class ReceitaEmProgressoBebida extends Component {
  constructor() {
    super();
    this.state = {
      cocktail: [],
      finalList: [],
      disabled: true,
      checked: [],
      loading: true,
      isALreadyFavorited: false,
      showSpan: false,
    };
    this.fetchAPI = this.fetchAPI.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.CopyToClipboard = this.CopyToClipboard.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getIngredientsFromLS = this.getIngredientsFromLS.bind(this);
    this.handleOnClickLike = this.handleOnClickLike.bind(this);
  }

  componentDidMount() {
    this.fetchAPI();
  }

  handleChange() {
    if (document.querySelectorAll('input[type="checkbox"]:checked').length
    === document.querySelectorAll('input[type="checkbox"]').length) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  handleClick(e) {
    const { target: { value } } = e;
    const { checked, finalList } = this.state;
    const { match: { params: { id } } } = this.props;
    const curr = !checked[value];
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (curr) {
      const obj = {
        ...inProgress,
        cocktails: {
          ...inProgress.cocktails,
          [id]: [...inProgress.cocktails[id], finalList[value]],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    } else {
      const newArray = inProgress.cocktails[id].filter((ing) => ing !== finalList[value]);
      const obj = {
        ...inProgress,
        cocktails: {
          ...inProgress.cocktails,
          [id]: newArray,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    }
    const base = -1;
    if (value !== base) {
      checked[value] = curr;
    }
    this.setState({
      checked,
    });
  }

  handleOnClickLike() {
    const { cocktail, isALreadyFavorited } = this.state;
    const obj = {
      id: cocktail.idDrink,
      type: 'bebida',
      area: '',
      category: cocktail.strCategory,
      alcoholicOrNot: cocktail.strAlcoholic,
      name: cocktail.strDrink,
      image: cocktail.strDrinkThumb,
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
        JSON.stringify(favoritedRecipes.filter((e) => e.id !== cocktail.idDrink)),
      );
    }
    this.setState({
      isALreadyFavorited: !isALreadyFavorited,
    });
  }

  getIngredientsFromLS() {
    const { match: { params: { id } } } = this.props;
    const { finalList } = this.state;
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const prepareBooleans = (master, keys) => {
      const booleans = master.map((el) => keys.includes(el));
      return booleans;
    };
    let array = [];
    if (inProgressRecipes === null) {
      const obj = {
        cocktails: {
          [id]: [],
        },
        meals: {
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    } else if (Object.hasOwnProperty.call(inProgressRecipes.cocktails, id)) {
      array = JSON.stringify(inProgressRecipes.cocktails[id]);
    } else {
      const obj = {
        ...inProgressRecipes,
        meals: {
          ...inProgressRecipes.meals,
          [id]: [],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    }
    this.setState({
      checked: prepareBooleans(finalList, array),
      loading: false,
    });
  }

  CopyToClipboard() { // https://orclqa.com/copy-url-clipboard/
    const { match: { params: { id } } } = this.props;
    const inputc = document.body.appendChild(document.createElement('input'));
    navigator.clipboard.writeText(`http://localhost:3000/bebidas/${id}`);
    document.execCommand('copy');
    inputc.parentNode.removeChild(inputc);
    this.setState({ showSpan: true }, () => {
      const ONE_SECOND = 2000;
      setTimeout(() => {
        this.setState({
          showSpan: false,
        });
      }, ONE_SECOND);
    });
  }

  async fetchAPI() {
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
      cocktail: data.drinks[0],
      ingredientList: ingredientListBuffer,
    }, () => {
      const { ingredientList, cocktail } = this.state;
      const doneList = ingredientList.map((e) => (cocktail[e]
        ? `${cocktail[e]} - ${cocktail[`strMeasure${e.match(/\d+/)[0]}`]}`
        : null)).filter(Boolean);
      this.setState({
        finalList: doneList,
      }, () => {
        this.getIngredientsFromLS();
      });
    });
    const favoritedRecipes = JSON.parse(
      localStorage.getItem('favoriteRecipes'),
    );
    const { cocktail } = this.state;
    if (
      favoritedRecipes !== null
      && favoritedRecipes.some((e) => e.id === cocktail.idDrink)
    ) {
      this.setState({ isALreadyFavorited: true });
    }
  }

  render() {
    const { cocktail: { idDrink, strDrinkThumb, strDrink, strAlcoholic,
      strInstructions, strCategory, strTags }, finalList, disabled, checked,
    loading, isALreadyFavorited, showSpan } = this.state;
    const { addDoneRecipe, match: { params: { id } } } = this.props;
    return (
      <main>
        <SectionBebidasEmProgresso
          id={ id }
          idDrink={ idDrink }
          strDrinkThumb={ strDrinkThumb }
          strDrink={ strDrink }
          strAlcoholic={ strAlcoholic }
          strInstructions={ strInstructions }
          strCategory={ strCategory }
          strTags={ strTags }
          finalList={ finalList }
          disabled={ disabled }
          checked={ checked }
          loading={ loading }
          isALreadyFavorited={ isALreadyFavorited }
          showSpan={ showSpan }
          CopyToClipboard={ this.CopyToClipboard }
          handleOnClickLike={ this.handleOnClickLike }
          handleClick={ this.handleClick }
          addDoneRecipe={ addDoneRecipe }
          handleChange={ this.handleChange }
        />
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addDoneRecipe: (id) => dispatch(addDrinkRecipeDone(id)),
});

export default connect(null, mapDispatchToProps)(ReceitaEmProgressoBebida);

ReceitaEmProgressoBebida.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
}.isRequired;
