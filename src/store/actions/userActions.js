import { Actions } from 'react-native-router-flux';
import apiService from '../../utils/apiService';
import {
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_ERROR,
  LOGOUT_USER,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
} from './types';

export const userLogin = (user) => (dispatch) => {
  dispatch({ type: LOGIN_USER });
  apiService('user/login', 'POST', user)
    .then((res) => {
      console.log('login', res);
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log('login err', error);
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: error.error,
      });
    });
};

export const createAccount = (user) => (dispatch) => {
  dispatch({ type: CREATE_ACCOUNT });
  apiService('user/signup', 'POST', user)
    .then((res) => {
      dispatch({
        type: CREATE_ACCOUNT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log('signuop err', error.error);
      dispatch({
        type: CREATE_ACCOUNT_ERROR,
        payload: error.error,
      });
    });
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT_USER });
  Actions.reset('sign_in');
};
