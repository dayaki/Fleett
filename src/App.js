import React, { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import { setCustomText, setCustomImage } from 'react-native-global-props';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { RootSiblingParent } from 'react-native-root-siblings';
import { PersistGate } from 'redux-persist/integration/react';
import axios from 'axios';
import Config from 'react-native-config';
import Router from './Router';
import { persistor, store } from './store';

const { BASE_URL } = Config;

// Setting default styles for all Text components.
const customTextProps = {
  style: {
    fontFamily: 'TTNormsPro-Regular',
    fontSize: 15,
  },
};

// Makes every image resize mode cover by default.
const customImageProps = {
  resizeMode: 'cover',
};

setCustomText(customTextProps);
setCustomImage(customImageProps);

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  const token = store.getState().user.profile?.auth_token;
  console.log('token', token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
  //   const token = store.getState().user.profile?.auth_token;
  //   config.headers.Authorization = token ? `Bearer ${token}` : '';
  //   return config;
});

// axios.interceptors.request.use(
//   (config) => {
//     console.log('config-------', config.url, BASE_URL);
//     if (config.url !== `${BASE_URL}/user/login`) {
//       const token = store.getState().user.profile?.auth_token;
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     }
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   },
// );

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <RootSiblingParent>
        <PersistGate persistor={persistor}>
          <Router />
        </PersistGate>
      </RootSiblingParent>
    </Provider>
    //   {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
    //   <Router />
    // </>
  );
};

export default App;
