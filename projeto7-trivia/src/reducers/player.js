import {
  SEND_SCORE,
} from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEND_SCORE:
    return {
      ...state,
      name: action.payload.player.name,
      assertions: action.payload.player.assertions,
      score: action.payload.player.score,
      gravatarEmail: action.payload.player.gravatarEmail,
    };
  default:
    return {
      ...state,
    };
  }
};

export default playerReducer;
