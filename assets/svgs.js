import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export const Email = (props) => (
  <Svg
    width={16}
    height={11}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M14.3 0H1.1A1.1 1.1 0 000 1.1v8.8A1.1 1.1 0 001.1 11h13.2a1.1 1.1 0 001.1-1.1V1.1A1.1 1.1 0 0014.3 0zm-1.21 1.1L7.7 4.829 2.31 1.1h10.78zM1.1 9.9V1.6l6.287 4.351a.55.55 0 00.627 0l6.286-4.35V9.9H1.1z"
      fill="#C6C6C6"
    />
  </Svg>
);

export const Password = (props) => (
  <Svg
    width={11}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 7.5H2a1 1 0 00-1 1v5a1 1 0 001 1h7a1 1 0 001-1v-5a1 1 0 00-1-1zm-7-1a2 2 0 00-2 2v5a2 2 0 002 2h7a2 2 0 002-2v-5a2 2 0 00-2-2H2zm0-3a3.5 3.5 0 117 0v3H8v-3a2.5 2.5 0 10-5 0v3H2v-3z"
      fill="#C6C6C6"
    />
  </Svg>
);
