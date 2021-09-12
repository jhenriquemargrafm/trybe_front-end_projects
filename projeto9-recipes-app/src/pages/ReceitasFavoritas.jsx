import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

class ReceitasFavoritas extends Component {
  constructor() {
    super();
    this.state = {
      favList: [],
      showSpan: false,
      currentList: [],
    };
    this.getListFromLS = this.getListFromLS.bind(this);
    this.filter = this.filter.bind(this);
    this.CopyToClipboard = this.CopyToClipboard.bind(this);
    this.handleOnClickLike = this.handleOnClickLike.bind(this);
  }

  componentDidMount() {
    this.getListFromLS();
  }

  handleOnClickLike(obj) {
    const { favList } = this.state;
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(
        favList.filter((recipe) => obj.id !== recipe.id),
      ),
    );
    this.getListFromLS();
  }

  getListFromLS() {
    const list = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (list !== null) {
      this.setState({
        favList: list,
        currentList: list,
      });
    }
  }

  CopyToClipboard(id, type) { // https://orclqa.com/copy-url-clipboard/
    const inputc = document.body.appendChild(document.createElement('input'));
    navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
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

  filter(e) {
    const { favList } = this.state;
    const { value } = e.target;
    let currentFilter = favList;
    if (value === 'comidas') {
      currentFilter = favList.filter((recipe) => recipe.type === 'comida');
    }
    if (value === 'bebidas') {
      currentFilter = favList.filter((recipe) => recipe.type === 'bebida');
    }
    this.setState({
      currentList: currentFilter,
    });
  }

  render() {
    const { currentList, showSpan } = this.state;
    const title = 'Receitas Favoritas';
    const lupa = 'desligada';
    return (
      <div>
        <Header
          title={ title }
          lupa={ lupa }
        />
        <button
          type="button"
          value="all"
          data-testid="filter-by-all-btn"
          onClick={ (e) => { this.filter(e); } }
        >
          all
        </button>
        <button
          type="button"
          value="comidas"
          data-testid="filter-by-food-btn"
          onClick={ (e) => { this.filter(e); } }
        >
          Comidas
        </button>
        <button
          type="button"
          value="bebidas"
          data-testid="filter-by-drink-btn"
          onClick={ (e) => { this.filter(e); } }
        >
          Bebidas
        </button>
        <span style={ { display: showSpan ? 'inline' : 'none' } }>
          Link copiado!
        </span>
        {currentList.map((obj, index) => (
          <div key={ index }>
            <Link
              to={ {
                pathname: `/${obj.type}s/${obj.id}`,
              } }
            >
              <span data-testid={ `${index}-horizontal-name` }>{ obj.name }</span>
            </Link>
            <span
              data-testid={ `${index}-horizontal-top-text` }
            >
              { `${obj.area} - ${obj.category}` }
              { obj.alcoholicOrNot }
            </span>
            <span data-testid={ `${index}-horizontal-done-date` }>{ obj.doneDate }</span>
            <button
              type="button"
              onClick={ () => this.CopyToClipboard(obj.id, obj.type) }
            >
              <img
                src={ shareIcon }
                alt="icone botão"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            <button
              onClick={ () => this.handleOnClickLike(obj) }
              type="button"
            >
              <img
                src={ blackHeartIcon }
                alt="icone botão"
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </button>
            <Link
              to={ {
                pathname: `/${obj.type}s/${obj.id}`,
              } }
            >
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ obj.image }
                alt={ obj.strName }
                className="photo"
              />
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default ReceitasFavoritas;
