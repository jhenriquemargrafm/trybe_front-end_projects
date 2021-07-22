import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Ranking extends Component {
  render() {
    const arrayRanking = JSON.parse(localStorage.getItem('ranking'));
    arrayRanking.sort((a, b) => b.score - a.score);
    return (
      <main>
        <h1 data-testid="ranking-title">Ranking</h1>
        { arrayRanking.map((player, index) => (
          <div key={ index }>
            <img src={ `https://www.gravatar.com/avatar/${player.hash}` } alt="Gravatar" />
            <h3 data-testid={ `player-name-${index}` }>{ player.name}</h3>
            <h3 data-testid={ `player-score-${index}` }>{ player.score}</h3>
          </div>
        ))}
        <Link to="/">
          <button data-testid="btn-go-home" type="button">Início</button>
        </Link>
      </main>
    );
  }
}
