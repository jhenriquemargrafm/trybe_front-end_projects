import { TURN_EDIT_BUTTON_ON, TURN_EDIT_BUTTON_OFF, CURRENT_ID } from '../actions';

const INITIAL_STATE = {
  addButton: false,
  editButton: true,
  stateId: null,
};

const button = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TURN_EDIT_BUTTON_ON:
    return {
      ...state,
      addButton: true,
      editButton: false,
    };
  case TURN_EDIT_BUTTON_OFF:
    return {
      ...state,
      addButton: false,
      editButton: true,
    };
  case CURRENT_ID:
    return {
      ...state,
      stateId: action.payload,
    };
  default:
    return state;
  }
};

export default button;
