import React, { useEffect } from 'react';
import { setCustomText, setCustomImage } from 'react-native-global-props';
import Router from './Router';

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
    console.log('APP.js');
  }, []);

  return <Router />;
};

export default App;
