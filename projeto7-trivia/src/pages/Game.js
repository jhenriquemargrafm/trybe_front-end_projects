import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getQuestionsThunk, sendScore } from '../actions';
import './Game.css';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      number: 0,
      disabled: false,
      seconds: 30,
      score: 0,
      assertions: 0,
    };

    this.colorOptions = this.colorOptions.bind(this);
    this.timer = this.timer.bind(this);
    this.handleQuestion = this.handleQuestion.bind(this);
  }

  componentDidMount() {
    const { getQuestions, name, email } = this.props;
    const { score, assertions } = this.state;
    const miliSeconds = 1000;
    this.interval = setInterval(this.timer, miliSeconds);
    if (localStorage.token) {
      getQuestions(localStorage.getItem('token'));
    }
    const player = {
      player: {
        name,
        gravatarEmail: email,
        score,
        assertions,
      },
    };
    localStorage.setItem('state', JSON.stringify(player));
  }

  colorOptions({ target }) {
    const { questions } = this.props;
    const { number, seconds } = this.state;
    const rightAnswer = document.querySelector('#correct-answer');
    const wrongAnswers = document.querySelectorAll('#wrong-answer');
    rightAnswer.classList.add('correct-color');
    wrongAnswers.forEach((answer) => {
      answer.classList.add('wrong-color');
    });
    this.setState({
      disabled: true,
    });
    if (target === rightAnswer) {
      let sum = 0;
      const easy = 1;
      const medium = 2;
      const hard = 3;
      switch (questions.results[number].difficulty) {
      case 'easy':
        sum = seconds * easy;
        break;
      case 'medium':
        sum = seconds * medium;
        break;
      case 'hard':
        sum = seconds * hard;
        break;
      default:
        break;
      }
      const ini = 10;
      this.setState((state) => ({
        score: state.score + ini + sum,
        assertions: state.assertions + 1,
      }), () => {
        const { name, email, sendScoreR } = this.props;
        const { score, assertions } = this.state;
        const player = {
          player: {
            name,
            gravatarEmail: email,
            score,
            assertions,
          },
        };
        localStorage.setItem('state', JSON.stringify(player));
        sendScoreR(player);
      });
    }
  }

  timer() {
    const { seconds, disabled } = this.state;
    this.setState((state) => ({
      seconds: state.seconds - 1,
    }));
    if (seconds < 1) {
      this.setState({
        disabled: true,
      });
      clearInterval(this.interval);
    }
    if (disabled) {
      clearInterval(this.interval);
    }
  }

  handleQuestion() {
    const miliSeconds = 1000;
    const rightAnswer = document.querySelector('#correct-answer');
    const wrongAnswers = document.querySelectorAll('#wrong-answer');
    rightAnswer.classList = '';
    wrongAnswers.forEach((answer) => {
      answer.classList = '';
    });
    this.setState((state) => ({
      number: state.number + 1,
      disabled: false,
      seconds: 30,
    }));
    this.interval = setInterval(this.timer, miliSeconds);
  }

  renderQuestions() {
    const { questions } = this.props;
    const { disabled, number } = this.state;
    const rightElement = questions.results[number].correct_answer;
    const incorrectElements = questions.results[number].incorrect_answers;
    const alternatives = [rightElement, ...incorrectElements].sort();
    return (
      <div>
        <h5
          className="question"
          data-testid="question-category"
        >
          {questions.results[number].category}
        </h5>
        <h2 className="question" data-testid="question-text">{questions.results[number].question}</h2>
        <div className="question">
          {alternatives.map((answer, index) => {
            if (answer === questions.results[number].correct_answer) {
              return (
                <button
                  key={ index }
                  type="button"
                  data-testid="correct-answer"
                  id="correct-answer"
                  onClick={ (event) => this.colorOptions(event) }
                  disabled={ disabled }
                >
                  {questions.results[number].correct_answer}
                </button>
              );
            }
            return (
              <button
                key={ index }
                type="button"
                data-testid="wrong-answer"
                id="wrong-answer"
                onClick={ (event) => this.colorOptions(event) }
                disabled={ disabled }
              >
                { answer }
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  render() {
    const { loading, hash, name } = this.props;
    const { disabled, seconds, number, score } = this.state;
    const maxQuestions = 5;
    const obj = {
      name,
      score,
      hash,
    };
    if (number === maxQuestions) {
      const ranking = JSON.parse(localStorage.getItem('ranking'));
      if (!ranking) {
        localStorage.setItem('ranking', JSON.stringify([obj]));
      } else {
        localStorage.setItem('ranking', JSON.stringify([...ranking, obj]));
      }
      return <Redirect to="/feedback" />;
    }
    return (
      <div className="interface color">
        <header className="center color">
          <img className="photo" data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${hash}` } alt="Gravatar" />
          <p className="center" data-testid="header-player-name">
            Player:
            { name }
          </p>
          <p className="center" data-testid="header-score">
            Pontuação:
            { score }
          </p>
        </header>
        <div>
          <p className="center" id="timer">
            Tempo restante:
            { seconds }
          </p>
          {!loading
            ? (this.renderQuestions()) : <p>loading...</p>}
          {disabled
            ? (
              <button
                onClick={ this.handleQuestion }
                data-testid="btn-next"
                type="button"
                id="btnNext"
              >
                Próxima
              </button>
            )
            : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.game.token,
  loading: state.game.loading,
  score: state.game.score,
  hash: state.login.hash,
  name: state.login.name,
  questions: state.game.questions,
  email: state.login.email,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(getQuestionsThunk(token)),
  sendScoreR: (player) => dispatch(sendScore(player)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  token: PropTypes.string,
  loading: PropTypes.bool,
}.isRequired;
