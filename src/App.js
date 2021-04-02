import React, { useEffect } from 'react';
import { setCustomText, setCustomImage } from 'react-native-global-props';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { RootSiblingParent } from 'react-native-root-siblings';
import { PersistGate } from 'redux-persist/integration/react';
import axios from 'axios';
import Router from './Router';
import { persistor, store } from './store';

const customTextProps = {
  style: {
    fontFamily: 'TTNormsPro-Regular',
    fontSize: 15,
  },
};

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
});

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
  );
};

export default App;
