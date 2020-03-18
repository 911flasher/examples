/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './styles.css';
import socket from './socket';

socket(store);

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
);
