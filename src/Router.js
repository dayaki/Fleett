import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
// import { checkAuth } from './utils/helpers';

import Onboarding from './screens/onboarding/';
import SignIn from './screens/authentication/SignIn';

const Routing = () => (
  <Router>
    <Stack key="root" hideNavBar>
      <Scene key="onboarding" component={Onboarding} />
      <Scene key="sign_in" component={SignIn} initial />
    </Stack>
  </Router>
);

export default Routing;
