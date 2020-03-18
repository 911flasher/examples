import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import { socketMiddleware } from '../socket';
import connection from './connectionReducer';
import tables from './tablesReducer';
import editableTable from './editableTableReducer';

const store = createStore(
  combineReducers({ connection, tables, editableTable }),
  applyMiddleware(logger, socketMiddleware)
);

export default store;
