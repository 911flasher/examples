import { LOGIN_SUCCESSFUL } from '../actions/actionTypes';

const connectionReducer = (state = false, action) => {
  switch (action.type) {
    case LOGIN_SUCCESSFUL:
      return true;
    default:
      return state;
  }
};

export default connectionReducer;
