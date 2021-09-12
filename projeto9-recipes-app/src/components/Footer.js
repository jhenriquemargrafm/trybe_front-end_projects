import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

class Footer extends Component {
  render() {
    return (
      <div className="footer" data-testid="footer">
        <Link to="/bebidas">
          <button type="button">
            <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drink" />
          </button>
        </Link>
        <Link to="/explorar">
          <button type="button">
            <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="explore" />
          </button>
        </Link>
        <Link to="/comidas">
          <button type="button">
            <img data-testid="food-bottom-btn" src={ mealIcon } alt="meal" />
          </button>
        </Link>

      </div>
    );
  }
}

export default Footer;
