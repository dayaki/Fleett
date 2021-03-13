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
  user: {},
  forgotPassword: {
    loading: false,
    error: '',
    success: false,
    operationType: '',
  },
  message: '',
  error: '',
  loading: false,
  isAuthenticated: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ACCOUNT:
      return {
        ...state,
        loading: true,
        error: '',
        message: '',
      };
    case CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: '',
      };
    case CREATE_ACCOUNT_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: action.payload,
      };
    case LOGIN_USER:
      return {
        ...state,
        loading: true,
        error: '',
        message: '',
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: '',
      };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LOGOUT_USER:
      return {
        ...state,
        user: {},
        isAuthenticated: false,
        loading: false,
        error: null,
        forgotPassword: {
          loading: false,
          error: '',
          success: false,
          operationType: '',
        },
      };
    case RESET_LOADER:
      return {
        ...state,
        loading: false,
        forgotPassword: {
          ...state.forgotPassword,
          loading: false,
        },
      };
    case CANCEL_REQUEST:
      return {
        ...state,
        loading: false,
        forgotPassword: {
          ...state.forgotPassword,
          loading: false,
        },
      };
    default:
      break;
  }
};
