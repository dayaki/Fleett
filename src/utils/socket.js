import socketIO from 'socket.io-client';
import Config from 'react-native-config';
const { SOCKET_PROD, SOCKET_DEV } = Config;

export const socket = socketIO(SOCKET_PROD);
