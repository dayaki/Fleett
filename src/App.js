import React, { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import { setCustomText, setCustomImage } from 'react-native-global-props';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
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
