import {
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_ERROR,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  RESET_LOADER,
  CANCEL_REQUEST,
} from '../actions/types';

const initialState = {
  profile: {},
  orders: {},
  error: '',
  loading: false,
  isAuthenticated: false,
  loginError: '',
  registerError: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ACCOUNT:
      return {
        ...state,
        loading: true,
        error: '',
        loginError: '',
        registerError: '',
      };
    case CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        isAuthenticated: true,
        loading: false,
        error: '',
        loginError: '',
        registerError: '',
      };
    case CREATE_ACCOUNT_ERROR:
      return {
        ...state,
        loading: false,
        error: '',
        loginError: '',
        registerError: action.payload,
      };
    case LOGIN_USER:
      return {
        ...state,
        loading: true,
        error: '',
        loginError: '',
        registerError: '',
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        isAuthenticated: true,
        loading: false,
        error: '',
        loginError: '',
        registerError: '',
      };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: '',
        loginError: action.payload,
        registerError: '',
      };

    case LOGOUT_USER:
      return {
        ...state,
        profile: {},
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    case RESET_LOADER:
      return {
        ...state,
        loading: false,
        error: '',
      };
    case CANCEL_REQUEST:
      return {
        ...state,
        loading: false,
        error: '',
      };
    default:
      return {
        ...state,
      };
  }
};
