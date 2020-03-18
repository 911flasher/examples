import {
  TABLE_LIST_RECEIVED,
  TABLE_REMOVAL_RECEIVED,
  TABLE_ADD_RECEIVED,
  TABLE_UPDATE_RECEIVED,
  REMOVE_TABLE,
  ADD_TABLE,
  UPDATE_TABLE
} from '../actions/actionTypes';

const tablesReducer = (state = [], action) => {
  switch (action.type) {
    case TABLE_LIST_RECEIVED: {
      return action.tables;
    }
    case TABLE_REMOVAL_RECEIVED:
    case REMOVE_TABLE: {
      return state.filter(({ id }) => id !== action.id);
    }
    case TABLE_ADD_RECEIVED: {
      const { after_id, table } = action;
      return [
        ...state.slice(0, after_id),
        table,
        ...state.slice(after_id),
      ];
    }
    case UPDATE_TABLE:
    case TABLE_UPDATE_RECEIVED: {
      const updatedTable = action.table;
      return state.map(t =>
        (updatedTable.id === t.id ? updatedTable : t)
      );
    }
    case ADD_TABLE:
      return state;
    default:
      return state;
  }
};

export default tablesReducer;
