import { Actions } from 'react-native-router-flux';
import apiService from '../../utils/apiService';
import {
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_ERROR,
  LOGOUT_USER,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  TRACK_SHIPMENT,
  TRACK_SHIPMENT_SUCCESS,
  TRACK_SHIPMENT_ERROR,
  LOGIN_USER_ERROR,
} from './types';
import { showToast } from '../../common';

export const userLogin = (user) => (dispatch) => {
  dispatch({ type: LOGIN_USER });
  apiService('user/login', 'POST', user)
    .then((res) => {
      console.log('login', res);
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: res.data,
      });
      Actions.home();
    })
    .catch((error) => {
      console.log('login err', error);
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: error.message,
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
      Actions.home();
    })
    .catch((error) => {
      console.log('signuop err', error.error);
      dispatch({
        type: CREATE_ACCOUNT_ERROR,
        payload: error.error,
      });
    });
};

export const trackOrder = (trackNumber) => (dispatch) => {
  dispatch({ type: TRACK_SHIPMENT });
  apiService('user/orders/track', 'POST', { track_number: trackNumber })
    .then((res) => {
      console.log('tracking', res);
      dispatch({
        type: TRACK_SHIPMENT_SUCCESS,
        payload: res.data,
      });
      Actions.home();
    })
    .catch((error) => {
      console.log('tracking err', error);
      showToast(error.message, 'error');
      dispatch({
        type: TRACK_SHIPMENT_ERROR,
        payload: error,
      });
    });
};

export const userLogout = () => (dispatch) => {
  dispatch({ type: LOGOUT_USER });
  Actions.sign_in();
};
