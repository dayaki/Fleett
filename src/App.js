import React, { useEffect } from 'react';
import { setCustomText } from 'react-native-global-props';
import Router from './Router';
// import { persistor, store } from './store';
// import { pingDevice } from './ble';

// const { BASE_URL } = Config;

const customTextProps = {
  style: {
    fontFamily: 'TTNormsPro-Regular',
    fontSize: 15,
  },
};

setCustomText(customTextProps);

const App = () => {
  useEffect(() => {
    console.log('APP.js');
  }, []);

  return <Router />;
};

export default App;
