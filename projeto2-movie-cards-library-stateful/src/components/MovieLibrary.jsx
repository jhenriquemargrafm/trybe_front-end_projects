import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MovieList from './MovieList';
import SearchBar from './SearchBar';
import AddMovie from './AddMovie';

class MovieLibrary extends Component {
  constructor(props) {
    super(props);
    const { movies } = this.props;
    this.state = {
      searchText: '',
      // Livro começa como não favoritado
      bookmarkedOnly: false,
      selectedGenre: '',
      movies,
    };
  }

  event = ({ target }) => {
    const { name } = target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    this.setState({ [name]: value });
  }

  onClick = (newMovie) => {
    const { movies } = this.state;
    this.setState({ movies: [...movies, newMovie] });
  }

  filteredMovies = () => {
    const { movies, searchText, bookmarkedOnly, selectedGenre } = this.state;
    if (bookmarkedOnly) { return movies.filter(({ bookmarked }) => bookmarked); }
    if (selectedGenre) {
      return movies
        .filter(({ genre }) => (genre === selectedGenre));
    }
    return movies
      .filter(({ title, subtitle, storyline }) => title
        .includes(searchText) || subtitle
        .includes(searchText) || storyline
        .includes(searchText));
  };

  render() {
    const { event } = this;
    const { bookmarkedOnly, searchText, selectedGenre } = this.state;
    const filteredMovies = this.filteredMovies();
    return (
      <div>
        <h2> My awesome movie library </h2>
        <SearchBar
          searchText={ searchText }
          onSearchTextChange={ event }
          bookmarkedOnly={ bookmarkedOnly }
          onBookmarkedChange={ event }
          selectedGenre={ selectedGenre }
          onSelectedGenreChange={ event }
        />
        <MovieList movies={ filteredMovies } />
        <AddMovie onClick={ this.onClick } />
      </div>
    );
  }
}

MovieLibrary.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    storyline: PropTypes.string,
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    imagePath: PropTypes.string,
  })).isRequired,
};

export default MovieLibrary;
