import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
// import { checkAuth } from './utils/helpers';

import Onboarding from './screens/onboarding/';
import SignIn from './screens/authentication/SignIn';
import Register from './screens/authentication/Register';
import ForgotPass from './screens/authentication/ForgotPass';

const Routing = () => (
  <Router>
    <Stack key="root" hideNavBar>
      <Scene key="onboarding" component={Onboarding} />
      <Scene key="sign_in" component={SignIn} initial />
      <Scene key="register" component={Register} />
      <Scene key="forgot_pass" component={ForgotPass} />
    </Stack>
  </Router>
);

export default Routing;
