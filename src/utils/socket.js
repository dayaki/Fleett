import socketIO from 'socket.io-client';
import Config from 'react-native-config';

const { SOCKET_PROD } = Config;

export const socket = socketIO(SOCKET_PROD);
