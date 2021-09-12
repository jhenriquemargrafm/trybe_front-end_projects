import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchInput from './SearchInput';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      searchInput: false,
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange() {
    const { searchInput } = this.state;
    if (searchInput === true) {
      this.setState({
        searchInput: false,
      });
    } else {
      this.setState({
        searchInput: true,
      });
    }
  }

  render() {
    const { title, switchModus, lupa } = this.props;
    const { searchInput } = this.state;
    return (
      <div>
        <Link to="/perfil">
          <button type="button">
            <img data-testid="profile-top-btn" src={ profileIcon } alt="profile" />
          </button>
        </Link>
        <span data-testid="page-title">{ title }</span>
        { (lupa === 'desligada') ? null : (
          <button
            type="button"
            onClick={ () => {
              this.handleSearchChange();
              switchModus();
            } }
          >
            <img data-testid="search-top-btn" src={ searchIcon } alt="lupa" />
          </button>
        )}
        {searchInput === false ? null : (<SearchInput title={ title } />)}
      </div>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  lupa: PropTypes.string.isRequired,
  switchModus: PropTypes.func.isRequired,
};

export default Header;
