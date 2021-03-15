import { combineReducers } from 'redux';
import userReducer from './userReducer';
import riderReducer from './riderReducer';

export default combineReducers({
  user: userReducer,
  rider: riderReducer,
});
