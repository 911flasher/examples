/* eslint no-console: 0 */
const logSocket = (messageData) => {
  console.group(`socket recieved: ${messageData.type}`);
  console.log(messageData);
  console.groupEnd();
};

export default logSocket;
