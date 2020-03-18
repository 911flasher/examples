export const messageToAction = (message) => {
  const { $type, ...rest } = JSON.parse(message);
  return { type: $type, ...rest };
};

export const actionToMessage = ({ type, ...rest }) =>
  JSON.stringify({ $type: type, ...rest });

const getTablesDataMessage = actionToMessage({ type: 'subscribe_tables' });

export const getTablesData = (socket) => {
  socket.send(getTablesDataMessage);
};
