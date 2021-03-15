import Axios from 'axios';
import PropTypes from 'prop-types';
import Config from 'react-native-config';
// import showToast from '../common/Toast';
import { CANCEL_REQUEST } from '../store/actions/types';
// import { store } from '../store';

const { BASE_URL } = Config;

const apiService = (url, type, data, headers) => {
  console.log(BASE_URL, url);
  if (!url || typeof url !== 'string') {
    // store.dispatch({ type: CANCEL_REQUEST });
    throw new Error('Please pass a string url to this function: /path/to/api');
  }
  if (!type || typeof type !== 'string') {
    // store.dispatch({ type: CANCEL_REQUEST });
    throw new Error(
      'Please add string api request type: GET, POST, PUT, PATCH, DELETE',
    );
  }

  const headerContent = () => {
    if (headers) {
      if (headers['Content-Type']) {
        return headers['Content-Type'];
      }
      return 'application/json';
    }
    return 'application/json';
  };

  // const deviceId = DeviceInfo.getUniqueId();
  const header = {
    // 'X-DEVICE-ID': deviceId,
    'Content-Type': headerContent(),
    ...headers,
  };

  return new Promise((resolve, reject) => {
    Axios({
      method: type,
      url: `${BASE_URL}${url}`,
      data,
      headers: header,
    })
      .then((res) => {
        resolve(res.data || res);
      })
      // eslint-disable-next-line consistent-return
      .catch((error) => {
        console.log(error, error.config);
        // Sentry.captureException(error);
        if (error && !error.response) {
          // showToast(
          //   'Could not connect to the server, please check your internet connection',
          // );
          console.log(
            'Could not connect to the server, please check your internet connection',
          );
          reject(new Error());
          // return store.dispatch({ type: CANCEL_REQUEST });
        }
        reject(error.response.data);
      });
  });
};

apiService.propTypes = {
  url: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  headers: PropTypes.object.isRequired,
};

export default apiService;
