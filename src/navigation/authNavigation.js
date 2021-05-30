import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Onboarding from '../screens/onboarding';
import SignIn from '../screens/authentication/SignIn';
import Register from '../screens/authentication/Register';
import ForgotPass from '../screens/authentication/ForgotPass';
import RiderLogin from '../screens/rider/Login';

const Stack = createStackNavigator();
const options = { headerShown: false };

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="onboarding" screenOptions={options}>
      <Stack.Screen name="onboarding" component={Onboarding} />
      <Stack.Screen name="signup" component={Register} />
      <Stack.Screen name="login" component={SignIn} />
      <Stack.Screen name="forgot_pass" component={ForgotPass} />
      <Stack.Screen name="rider_login" component={RiderLogin} />
    </Stack.Navigator>
  );
};

export default AuthStack;
