export const GET_TOKEN = 'GET_TOKEN';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_FAILED = 'GET_TOKEN_FAILED';

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS';
export const GET_QUESTIONS_FAILED = 'GET_QUESTIONS_FAILED';

export const SEND_EMAIL = 'SEND_EMAIL';

export const SEND_SCORE = 'ADD_PLAYER';

export const sendEmail = (email, name) => ({
  type: SEND_EMAIL,
  payload: email,
  payload2: name,
});

export const getToken = () => ({
  type: GET_TOKEN,
});

export const getTokenSuccess = (payload) => ({
  type: GET_TOKEN_SUCCESS,
  payload,
});

export const getTokenFailed = (payload) => ({
  type: GET_TOKEN_FAILED,
  payload,
});

export const getQuestions = () => ({
  type: GET_QUESTIONS,
});

export const getQuestionsSuccess = (payload) => ({
  type: GET_QUESTIONS_SUCCESS,
  payload,
});

export const getQuestionsFailed = (payload) => ({
  type: GET_QUESTIONS_FAILED,
  payload,
});

export const sendScore = (player) => ({
  type: SEND_SCORE,
  payload: player,
});

export const getQuestionsThunk = (token) => async (dispatch) => {
  dispatch(getQuestions());
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    dispatch(getQuestionsSuccess(data));
  } catch (error) {
    dispatch(getQuestionsFailed(error));
  }
};

export const getTokenThunk = () => async (dispatch) => {
  dispatch(getToken());
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const results = await response.json();
    dispatch(getQuestionsThunk(results.token));
    dispatch(getTokenSuccess(results));
  } catch (error) {
    dispatch(getTokenFailed(error));
    dispatch(getQuestionsThunk(error));
  }
};
