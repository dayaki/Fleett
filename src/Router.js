import React, { useEffect, useState } from 'react';
import { Router, Scene, Stack, Drawer } from 'react-native-router-flux';
import { store } from './store';
import { checkUserAuth, checkRiderAuth } from './utils/helpers';

import Onboarding from './screens/onboarding/';
import Launch from './screens/onboarding/launch';
import SignIn from './screens/authentication/SignIn';
import Register from './screens/authentication/Register';
import ForgotPass from './screens/authentication/ForgotPass';
import DrawerMenu from './screens/dashboard/drawer';
import Home from './screens/dashboard/home';
import Order from './screens/dashboard/order';
import History from './screens/dashboard/order/History';
import About from './screens/dashboard/about';
import OrderTwo from './screens/dashboard/order/Step2';
import OrderDetail from './screens/dashboard/order/Detail';
import Web from './common/webview';
import TransactionStatus from './screens/transaction/TransactionStatus';
import FindRider from './screens/transaction/FindRider';

// Rider
import Login from './screens/rider/Login';
import Dashboard from './screens/rider/Dashboard';

import { wp } from './common';

const Routing = () => (
  <Router>
    <Scene key="root">
      <Stack key="user" hideNavBar>
        <Scene
          key="launch"
          component={Launch}
          initial
          on={() => checkRiderAuth()}
          success="rider_dashboard"
          failure="rider_login"
        />
        <Scene key="onboarding" component={Onboarding} />
        <Scene key="sign_in" component={SignIn} />
        <Scene key="register" component={Register} />
        <Scene key="forgot_pass" component={ForgotPass} />
        <Drawer
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
        <Scene key="order_two" component={OrderTwo} />
        <Scene key="order_detail" component={OrderDetail} />
        <Scene key="webview" component={Web} />
        <Scene key="transaction_status" component={TransactionStatus} />
        <Scene key="find_rider" component={FindRider} />

        <Scene key="rider_login" component={Login} />
        <Scene key="rider_dashboard" component={Dashboard} />
      </Stack>
    </Scene>
  </Router>
);

// const Routing = () => {
//   const [userType, setUserType] = useState('user');
//   useEffect(() => {
//     checkState();
//   }, []);

//   const checkState = async () => {
//     const riderId = await store.getState().rider.profile?.id;
//     if (riderId) {
//       setUserType('rider');
//     }
//   };
//   return (
//     <Router>
//       {userType === 'rider' ? (
//         <Stack key="rider" hideNavBar>
//           <Scene
//             key="launch"
//             component={Launch}
//             initial
//             on={() => checkRiderAuth()}
//             success="rider_dashboard"
//             failure="rider_login"
//           />
//           <Scene key="rider_login" component={Login} />
//           <Scene key="rider_dashboard" component={Dashboard} />
//         </Stack>
//       ) : (
//         <Stack key="root" hideNavBar>
//           <Scene
//             key="launch"
//             component={Launch}
//             initial
//             on={() => checkUserAuth()}
//             success="home"
//             failure="onboarding"
//           />
//           <Scene key="onboarding" component={Onboarding} />
//           <Scene key="sign_in" component={SignIn} />
//           <Scene key="register" component={Register} />
//           <Scene key="forgot_pass" component={ForgotPass} />
//           <Drawer
//             hideNavBar
//             key="drawer"
//             headerMode="none"
//             contentComponent={DrawerMenu}
//             drawerWidth={wp(268)}>
//             <Scene key="home" component={Home} />
//             <Scene key="history" component={History} />
//             <Scene key="about" component={About} />
//           </Drawer>
//           <Scene key="order" component={Order} />
//           <Scene key="order_two" component={OrderTwo} />
//           <Scene key="order_detail" component={OrderDetail} />
//           <Scene key="webview" component={Web} />
//           <Scene key="transaction_status" component={TransactionStatus} />
//           <Scene key="find_rider" component={FindRider} />
//         </Stack>
//       )}
//     </Router>
//   );
// };

export default Routing;
