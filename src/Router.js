import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
// import { checkAuth } from './utils/helpers';

import Onboarding from './screens/onboarding/';
import SignIn from './screens/authentication/SignIn';
import Register from './screens/authentication/Register';
import ForgotPass from './screens/authentication/ForgotPass';

import Home from './screens/home';

const Routing = () => (
  <Router>
    <Stack key="root" hideNavBar>
      <Scene key="onboarding" component={Onboarding} />
      <Scene key="sign_in" component={SignIn} />
      <Scene key="register" component={Register} />
      <Scene key="forgot_pass" component={ForgotPass} />
      <Scene key="home" component={Home} initial />
    </Stack>
  </Router>
);

export default Routing;
