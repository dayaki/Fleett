import axios from 'axios';
import Config from 'react-native-config';
import { CANCEL_REQUEST } from '../store/actions/types';
import { store } from '../store';

const { BASE_URL, LOCALHOST } = Config;

const apiService = (url, type, data, headers) => {
  if (!url || typeof url !== 'string') {
    store.dispatch({ type: CANCEL_REQUEST });
    throw new Error('Please pass a string url to this function: /path/to/api');
  }
  if (!type || typeof type !== 'string') {
    store.dispatch({ type: CANCEL_REQUEST });
    throw new Error(
      'Please add string api request type: GET, POST, PUT, PATCH, DELETE',
    );
  }

  const init = headers || {
    'Content-Type': 'application/json',
  };

  return new Promise((resolve, reject) => {
    console.log('URL =>', `${LOCALHOST}${url}`);
    axios({
      method: type,
      url: `${BASE_URL}${url}`,
      data,
      headers: init,
    })
      .then((res) => {
        resolve(res.data || res);
      })
      .catch((error) => {
        console.log('error', error);
        if (error && !error.response) {
          console.log(
            'Could not connect to the server, please check your internet connection',
          );
          reject(new Error());
          return store.dispatch({ type: CANCEL_REQUEST });
        }
        reject(error.response.data);
      });
  });
};

export default apiService;
