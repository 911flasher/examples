import {
  ADD_TABLE,
  UPDATE_TABLE,
  REMOVE_TABLE,
  GO_TO_EDIT_TABLE,
} from './actionTypes';

export const addTable = payload => ({ type: ADD_TABLE, ...payload });

export const updateTable = table => ({ type: UPDATE_TABLE, table });

export const removeTable = id => ({ type: REMOVE_TABLE, id });

export const goToEditTable = table => ({ type: GO_TO_EDIT_TABLE, table });