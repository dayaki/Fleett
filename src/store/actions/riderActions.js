import { Actions } from 'react-native-router-flux';
import apiService from '../../utils/apiService';
import {
  CANCEL_REQUEST,
  LOADING,
  RIDER_LOGIN,
  RIDER_LOGIN_ERROR,
  RIDER_LOGOUT,
  UPDATE_RIDER_STATUS,
} from './types';
import { showToast } from '../../common';

export const riderLogin = (data) => (dispatch) => {
  dispatch({ type: LOADING });
  apiService('rider/login', 'POST', data)
    .then((res) => {
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

export const updateRiderStatus = (updateData) => (dispatch) => {
  dispatch({ type: LOADING });
  apiService('rider/status', 'PATCH', updateData)
    .then(({ data }) => {
      console.log('res status', data);
      dispatch({
        type: UPDATE_RIDER_STATUS,
        payload: data,
      });
    })
    .catch((error) => {
      console.log('login err', error);
      dispatch({
        type: CANCEL_REQUEST,
        payload: error.message,
      });
      showToast(error.message);
    });
};

export const logout = () => (dispatch) => {
  dispatch({ type: RIDER_LOGOUT });
  Actions.sign_in();
};
