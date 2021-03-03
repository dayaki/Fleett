import React from 'react';
import { Router, Scene, Stack, Drawer } from 'react-native-router-flux';
// import { checkAuth } from './utils/helpers';

import Onboarding from './screens/onboarding/';
import SignIn from './screens/authentication/SignIn';
import Register from './screens/authentication/Register';
import ForgotPass from './screens/authentication/ForgotPass';
import DrawerMenu from './screens/dashboard/drawer';
import Home from './screens/dashboard/home';
import Order from './screens/dashboard/order';
import History from './screens/dashboard/order/History';
import About from './screens/dashboard/about';

import { wp } from './common';

const Routing = () => (
  <Router>
    <Stack key="root" hideNavBar>
      <Scene key="onboarding" component={Onboarding} />
      <Scene key="sign_in" component={SignIn} />
      <Scene key="register" component={Register} />
      <Scene key="forgot_pass" component={ForgotPass} />
      <Drawer
        initial
        hideNavBar
        key="drawer"
        headerMode="none"
        contentComponent={DrawerMenu}
        drawerWidth={wp(268)}>
        <Scene key="home" component={Home} />
        <Scene key="history" component={History} />
        <Scene key="about" component={About} />
      </Drawer>
      <Scene key="order" component={Order} />
    </Stack>
  </Router>
);

export default Routing;
