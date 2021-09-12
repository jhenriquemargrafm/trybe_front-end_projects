import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

class ReceitasFeitas extends Component {
  constructor() {
    super();
    this.state = {
      doneList: [],
      showSpan: false,
      currentList: [],
    };
    this.getListFromLS = this.getListFromLS.bind(this);
    this.CopyToClipboard = this.CopyToClipboard.bind(this);
    this.CopyToClipboard = this.CopyToClipboard.bind(this);
  }

  componentDidMount() {
    this.getListFromLS();
  }

  getListFromLS() {
    const list = JSON.parse(localStorage.getItem('doneRecipes'));
    if (list !== null) {
      this.setState({
        doneList: list,
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
    const { doneList } = this.state;
    const { value } = e.target;
    let currentFilter = doneList;
    if (value === 'comidas') {
      currentFilter = doneList.filter((recipe) => recipe.type === 'comida');
      console.log(currentFilter);
    }
    if (value === 'bebidas') {
      currentFilter = doneList.filter((recipe) => recipe.type === 'bebida');
      console.log(currentFilter);
    }
    this.setState({
      currentList: currentFilter,
    });
  }

  render() {
    const title = 'Receitas Feitas';
    const lupa = 'desligada';
    const { currentList, showSpan } = this.state;
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
            { obj.tags === null ? <div>Não há tags</div> : (
              <div>
                {
                  obj.tags.toString().split(',').map((tagName, idx) => (
                    <span
                      key={ idx }
                      data-testid={ `${index}-${tagName}-horizontal-tag` }
                    >
                      {tagName}
                    </span>
                  ))
                }
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default ReceitasFeitas;
