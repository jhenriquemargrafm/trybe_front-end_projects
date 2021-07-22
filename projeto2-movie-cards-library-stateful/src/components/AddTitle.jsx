import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Title extends Component {
  render() {
    const { handleValue, title } = this.props;
    return (
      <label
        data-testid="title-input-label"
        htmlFor="titulo"
      >
        Título
        <input
          name="title"
          onChange={ handleValue }
          data-testid="title-input"
          value={ title }
          id="titulo"
          type="text"
        />
      </label>);
  }
}

Title.propTypes = {
  handleValue: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Title;
