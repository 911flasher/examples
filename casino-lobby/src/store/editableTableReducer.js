import { GO_TO_EDIT_TABLE, UPDATE_TABLE } from '../actions/actionTypes';

const editableTable = (state = null, action) => {
  switch (action.type) {
    case GO_TO_EDIT_TABLE:
      return action.table;
    case UPDATE_TABLE:
      return null;
    default:
      return state;
  }
};

export default editableTable;
