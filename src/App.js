import React, { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import { setCustomText, setCustomImage } from 'react-native-global-props';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import axios from 'axios';
import Router from './Router';
import { persistor, store } from './store';

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

//  axios request interceptor
// axios.interceptors.request.use(
//   (config) => {
//     if (!config.url.includes('/login') || !config.url.includes('/signup')) {
//       const token = store.getState().auth.user?.auth_token;
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
      <PersistGate persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
    //   {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
    //   <Router />
    // </>
  );
};

export default App;
