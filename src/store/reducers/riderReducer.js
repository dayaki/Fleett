import {
  RIDER_LOGIN,
  RESET_LOADER,
  CANCEL_REQUEST,
  RIDER_LOGIN_ERROR,
  RIDER_LOGOUT,
  LOADING,
  UPDATE_RIDER_STATUS,
  UPDATE_RIDER_SOCKET,
} from '../actions/types';

const initialState = {
  profile: {},
  orders: {},
  error: null,
  loading: false,
  isAuthenticated: false,
  loginError: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
        error: null,
        loginError: null,
      };
    case RIDER_LOGIN:
      return {
        ...state,
        profile: action.payload,
        isAuthenticated: true,
        error: null,
        loginError: null,
        loading: false,
      };
    case RIDER_LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        loginError: action.payload,
      };
    case UPDATE_RIDER_STATUS:
      return {
        ...state,
        profile: action.payload,
      };
    case UPDATE_RIDER_SOCKET:
      return {
        ...state,
        profile: { ...state.profile, socketId: action.payload },
      };
    case RIDER_LOGOUT:
      return {
        ...state,
        profile: {},
        isAuthenticated: false,
        loading: false,
        error: null,
        loginError: null,
      };
    case RESET_LOADER:
      return {
        ...state,
        loading: false,
        error: null,
        loginError: null,
      };
    case CANCEL_REQUEST:
      return {
        ...state,
        loading: false,
        error: null,
        loginError: null,
      };
    default:
      return state;
  }
};
