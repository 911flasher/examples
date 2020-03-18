import { socketActions, userActions } from '../actions/actionTypes';
import { actionToMessage, messageToAction, getTablesData } from './helpers';
import logSocket from './logSocket';

const errorTypes = ['removal_failed', 'update_failed'];

let socket;

export const socketMiddleware = () => next => (action) => {
  const result = next(action);
  if (socket && userActions.includes(action.type)) {
    socket.send(actionToMessage(action));
  }
  return result;
};

export default (store) => {
  socket = new WebSocket('wss://js-assignment.evolutiongaming.com/ws_api');

  socket.onopen = () => {
    socket.send(actionToMessage({
      type: 'login',
      username: 'user1234',
      password: 'password1234'
    }));

    getTablesData(socket);

    socket.onmessage = (message) => {
      const action = messageToAction(message.data);
      logSocket(action);

      if (errorTypes.includes(action.type)) {
        getTablesData(socket);
        return;
      }

      if (socketActions.includes(action.type)) {
        store.dispatch(action);
      }
    };
  };
};

