import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Iframe extends Component {
  render() {
    const { strMeal, strYoutube } = this.props;
    return (
      <iframe
        title={ strMeal }
        width="100%"
        height="260"
        data-testid="video"
        src={
          strYoutube
            ? `https://www.youtube.com/embed/${strYoutube.split('=')[1]}`
            : null
        }
      />
    );
  }
}

Iframe.propTypes = {
  strMeal: PropTypes.string.isRequired,
  strYoutube: PropTypes.string.isRequired,
};

export default Iframe;
