import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchAPIFoodList, fetchAPIDrinkList } from '../services/API';

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendedIndex: 1,
      prevBtnDisabled: true,
      nextBtnDisabled: false,
      recommendedList: [],
    };

    this.prevTwoRecommendedMealCards = this.prevTwoRecommendedMealCards.bind(this);
    this.nextTwoRecommendedMealCards = this.nextTwoRecommendedMealCards.bind(this);
    this.populateRecommendedList = this.populateRecommendedList.bind(this);
  }

  componentDidMount() {
    this.populateRecommendedList();
  }

  async populateRecommendedList() {
    const { detailType } = this.props;
    let data;
    if (detailType === 'BebidasDetalhes') {
      data = await fetchAPIFoodList();
    } else if (detailType === 'ComidasDetalhes') {
      data = await fetchAPIDrinkList();
    }
    data.length = 6;
    this.setState({
      recommendedList: data,
    });
  }

  prevTwoRecommendedMealCards() {
    const showCardClass = 'recommendedCard showCard';
    const { recommendedIndex } = this.state;
    const actualShowingCards = document.querySelectorAll('.showCard');
    const Three = 3;
    switch (recommendedIndex) {
    case 2: {
      actualShowingCards.forEach((e) => { e.className = 'recommendedCard'; });
      const nextShowingCard0 = document.querySelector(
        '[data-testid="0-recomendation-card"]',
      );
      const nextShowingCard1 = document.querySelector(
        '[data-testid="1-recomendation-card"]',
      );
      nextShowingCard0.className = showCardClass;
      nextShowingCard1.className = showCardClass;
      this.setState({
        recommendedIndex: 1,
        prevBtnDisabled: true,
      });
      break;
    }
    case Three: {
      actualShowingCards.forEach((e) => { e.className = 'recommendedCard'; });
      const nextShowingCard2 = document.querySelector(
        '[data-testid="2-recomendation-card"]',
      );
      const nextShowingCard3 = document.querySelector(
        '[data-testid="3-recomendation-card"]',
      );
      nextShowingCard2.className = showCardClass;
      nextShowingCard3.className = showCardClass;
      this.setState({
        recommendedIndex: 2,
        nextBtnDisabled: false,
      });
      break;
    }
    default: {
      break;
    }
    }
  }

  nextTwoRecommendedMealCards() {
    const { recommendedIndex } = this.state;
    const actualShowingCards = document.querySelectorAll('.showCard');
    const showCardClass = 'recommendedCard showCard';
    switch (recommendedIndex) {
    case 1: {
      actualShowingCards.forEach((e) => {
        e.className = 'recommendedCard';
      });
      const nextShowingCard2 = document.querySelector(
        '[data-testid="2-recomendation-card"]',
      );
      const nextShowingCard3 = document.querySelector(
        '[data-testid="3-recomendation-card"]',
      );
      nextShowingCard2.className = showCardClass;
      nextShowingCard3.className = showCardClass;
      this.setState({
        recommendedIndex: 2,
        prevBtnDisabled: false,
      });
      break;
    }
    case 2: {
      actualShowingCards.forEach((e) => {
        e.className = 'recommendedCard';
      });
      const nextShowingCard4 = document.querySelector(
        '[data-testid="4-recomendation-card"]',
      );
      const nextShowingCard5 = document.querySelector(
        '[data-testid="5-recomendation-card"]',
      );
      nextShowingCard4.className = showCardClass;
      nextShowingCard5.className = showCardClass;
      this.setState({
        recommendedIndex: 3,
        nextBtnDisabled: true,
      });
      break;
    }
    default:
      break;
    }
  }

  render() {
    const { prevBtnDisabled, nextBtnDisabled, recommendedList } = this.state;
    const { detailType } = this.props;
    return (
      <section className="recommended">
        <button
          type="button"
          className="previousBtn"
          disabled={ prevBtnDisabled }
          onClick={ () => this.prevTwoRecommendedMealCards() }
        >
          Comidas Anteriores
        </button>
        {detailType === 'BebidasDetalhes' ? recommendedList.map((e, index) => (
          <div
            className={ `recommendedCard ${index <= 1 ? 'showCard' : ''}` }
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <img
              className="thumb"
              alt={ `${e.strMeal}` }
              src={ e.strMealThumb }
            />
            <p>{e.strCategory}</p>
            <span data-testid={ `${index}-recomendation-title` }>
              {e.strMeal}
            </span>
          </div>
        )) : recommendedList.map((e, index) => (
          <div
            className={ `recommendedCard ${index <= 1 ? 'showCard' : ''}` }
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <img
              className="thumb"
              alt={ e.strDrinkThumb }
              src={ e.strDrinkThumb }
            />
            <p>{e.strAlcoholic}</p>
            <span data-testid={ `${index}-recomendation-title` }>
              {e.strDrink}
            </span>
          </div>
        ))}
        <button
          type="button"
          className="nextBtn"
          disabled={ nextBtnDisabled }
          onClick={ () => this.nextTwoRecommendedMealCards() }
        >
          Próximas Comidas
        </button>
      </section>
    );
  }
}

export default Carousel;

Carousel.propTypes = {
  detailType: PropTypes.string.isRequired,
};
