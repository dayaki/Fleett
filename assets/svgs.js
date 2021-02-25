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

export const BackArrow = (props) => (
  <Svg
    width={11}
    height={16}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 476.213 476.213"
    {...props}>
    <Path
      d="M476.213 223.107H57.427l94.393-94.394-21.213-21.213L0 238.106l130.607 130.608L151.82 347.5l-94.393-94.393h418.786z"
      fill="#000"
    />
  </Svg>
);

export const User = (props) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M5.684 0a3.161 3.161 0 00-3.158 3.158 3.161 3.161 0 003.158 3.158 3.161 3.161 0 003.158-3.158A3.161 3.161 0 005.684 0zm0 5.053A1.897 1.897 0 013.79 3.158c0-1.045.85-1.895 1.895-1.895s1.895.85 1.895 1.895-.85 1.895-1.895 1.895zM11.368 12v-.632a4.427 4.427 0 00-4.42-4.42H4.42A4.426 4.426 0 000 11.367V12h1.263v-.632a3.161 3.161 0 013.158-3.157h2.526a3.162 3.162 0 013.158 3.157V12h1.263z"
      fill="#C6C6C6"
    />
  </Svg>
);

export const Phone = (props) => (
  <Svg
    width={10}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 1H2a1 1 0 00-1 1v12a1 1 0 001 1h6a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V2a2 2 0 00-2-2H2z"
      fill="#C6C6C6"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 14a1 1 0 100-2 1 1 0 000 2z"
      fill="#C6C6C6"
    />
  </Svg>
);
