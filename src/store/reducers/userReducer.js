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
  PREPARE_ORDER,
  RESET_TEMP_ORDER,
  INITIATE_ORDER,
  INITIATE_ORDER_SUCESS,
  INITIATE_ORDER_ERROR,
} from '../actions/types';

const initialState = {
  profile: {},
  tempOrder: {},
  orders: {},
  error: '',
  loading: false,
  isAuthenticated: false,
  loginError: '',
  registerError: '',
  closeBottomSheet: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PREPARE_ORDER:
      return {
        ...state,
        tempOrder: { ...state.tempOrder, ...action.payload },
      };
    case INITIATE_ORDER:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case INITIATE_ORDER_SUCESS:
      return {
        ...state,
        loading: false,
        closeBottomSheet: true,
      };
    case INITIATE_ORDER_ERROR:
      return {
        ...state,
        loading: false,
        closeBottomSheet: false,
        // tempOrder: {},
      };
    case RESET_TEMP_ORDER:
      return {
        ...state,
        tempOrder: {},
        loading: false,
      };
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
        registerError: '',
        loginError: '',
        tempOrder: {},
      };
    case CANCEL_REQUEST:
      return {
        ...state,
        loading: false,
        error: '',
      };
    default:
      return state;
  }
};
