import { Actions } from 'react-native-router-flux';
import apiService from '../../../utils/apiService';
import {
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_ERROR,
  LOGOUT_USER,
} from '../types';

export const createAccount = (user) => (dispatch) => {
  dispatch({ type: CREATE_ACCOUNT });
  apiService('/signup', 'POST', user)
    .then((res) => {
      console.log('signuop', res);
      dispatch({
        type: CREATE_ACCOUNT_SUCCESS,
        payload: res.message,
      });
    })
    .catch((error) => {
      console.log('signuop err', error);
      dispatch({
        type: CREATE_ACCOUNT_ERROR,
        payload: error,
      });
    });
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT_USER });
  Actions.reset('sign_in');
};
