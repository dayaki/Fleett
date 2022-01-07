import { navigate } from '../../navigation/navigationService';
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
  INITIATE_ORDER,
  INITIATE_ORDER_SUCESS,
  INITIATE_ORDER_ERROR,
  SAVE_PICKUP,
  SAVE_DESTINATION,
} from './types';
import { showToast } from '../../common';

export const userLogin = (user) => async (dispatch) => {
  dispatch({ type: LOGIN_USER });
  try {
    const response = await apiService('user/login', 'POST', user);
    console.log('login', response);
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: response.data,
    });
    return Promise.resolve(response);
  } catch (error) {
    console.log('login err', error);
    dispatch({
      type: LOGIN_USER_ERROR,
      payload: error.message,
    });
    return Promise.reject(error);
  }
};

// export const userLogin = (user) => (dispatch) => {
//   dispatch({ type: LOGIN_USER });
//   apiService('user/login', 'POST', user)
//     .then((res) => {
//       console.log('login', res);
//       dispatch({
//         type: LOGIN_USER_SUCCESS,
//         payload: res.data,
//       });
//       navigate('user_home');
//     })
//     .catch((error) => {
//       console.log('login err', error);
//       dispatch({
//         type: LOGIN_USER_ERROR,
//         payload: error.message,
//       });
//     });
// };

export const createAccount = (user) => (dispatch) => {
  dispatch({ type: CREATE_ACCOUNT });
  apiService('user/signup', 'POST', user)
    .then((res) => {
      dispatch({
        type: CREATE_ACCOUNT_SUCCESS,
        payload: res.data,
      });
      navigate('home');
    })
    .catch((error) => {
      console.log('signuop err', error);
      dispatch({
        type: CREATE_ACCOUNT_ERROR,
        payload: error.error,
      });
    });
};

export const savePickupAddress = (address) => (dispatch) => {
  dispatch({ type: SAVE_PICKUP, payload: address });
};

export const saveDestination = (address) => (dispatch) => {
  dispatch({ type: SAVE_DESTINATION, payload: address });
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
      navigate('home');
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

export const initiateOrder = (data) => (dispatch) => {
  dispatch({ type: INITIATE_ORDER });
  apiService('user/orders/initiate', 'POST', data)
    .then((res) => {
      console.log('initiate', res);
      dispatch({
        type: INITIATE_ORDER_SUCESS,
        payload: res.data,
      });
      const params = {
        uri: res.data,
      };
      navigate('webview', { params });
    })
    .catch((error) => {
      console.log('initiate err', error);
      showToast(error.message, 'error');
      dispatch({
        type: INITIATE_ORDER_ERROR,
        payload: error,
      });
    });
};

export const userLogout = () => (dispatch) => {
  dispatch({ type: LOGOUT_USER });
};
