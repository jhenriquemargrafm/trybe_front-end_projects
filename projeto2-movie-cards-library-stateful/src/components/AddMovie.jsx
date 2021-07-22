import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Title from './AddTitle';
import Subtitle from './AddSubtitle';
import Image from './AddImage';
import Synopses from './AddSynopses';

class AddMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      subtitle: '',
      imagePath: '',
      storyline: '',
      rating: 0,
      genre: 'action',
    };
    this.handleValue = this.handleValue.bind(this);
  }

  // Funções para adicionar os filmes na página
  // Lidando com
  handleValue({ target }) {
    const { name } = target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    this.setState({ [name]: value });
  }

  callBack = () => {
    const { onClick } = this.props;
    const newMovie = (this.state);
    console.log(newMovie);
    onClick(newMovie);
    this.setState(() => ({
      title: '',
      subtitle: '',
      imagePath: '',
      storyline: '',
      rating: 0,
      genre: 'action',
    }));
  }

  render() {
    const { title, subtitle, imagePath } = this.state;
    const { storyline, rating, genre } = this.state;
    return (
      <form data-testid="add-movie-form">
        <Title handleValue={ this.handleValue } title={ title } />
        <Subtitle handleValue={ this.handleValue } subtitle={ subtitle } />
        <Image handleValue={ this.handleValue } imagePath={ imagePath } />
        <Synopses handleValue={ this.handleValue } storyline={ storyline } />
        <label data-testid="rating-input-label" htmlFor="rating-input-label">
          Avaliação
          <input
            data-testid="rating-input"
            name="rating"
            onChange={ this.handleValue }
            value={ rating }
            type="number"
          />
        </label>
        <label data-testid="genre-input-label" htmlFor="genre-input-label">
          Gênero
          <select
            data-testid="genre-input"
            name="genre"
            value={ genre }
            onChange={ this.handleValue }
          >
            <option data-testid="genre-option" value="action">Ação</option>
            <option data-testid="genre-option" value="comedy">Comédia</option>
            <option data-testid="genre-option" value="thriller">Suspense</option>
          </select>
        </label>
        <button data-testid="send-button" onClick={ this.callBack } type="button">
          Adicionar filme
        </button>
      </form>
    );
  }
}

AddMovie.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddMovie;
