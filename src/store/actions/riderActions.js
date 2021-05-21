import { Actions } from 'react-native-router-flux';
import apiService from '../../utils/apiService';
import {
  CANCEL_REQUEST,
  LOADING,
  RIDER_LOGIN,
  RIDER_LOGIN_ERROR,
} from './types';
import { showToast } from '../../common';

export const riderLogin = (data) => (dispatch) => {
  dispatch({ type: LOADING });
  apiService('rider/login', 'POST', data)
    .then((res) => {
      console.log('login', res);
      dispatch({
        type: RIDER_LOGIN,
        payload: res.data,
      });
      Actions.rider_dashboard();
    })
    .catch((error) => {
      console.log('login err', error);
      dispatch({
        type: RIDER_LOGIN_ERROR,
        payload: error.message,
      });
    });
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT_USER });
  Actions.sign_in();
};
