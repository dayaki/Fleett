import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SideMenu from '../screens/rider/SideMenu';
import Dashboard from '../screens/rider/Dashboard';

const Drawer = createDrawerNavigator();
const options = { headerShown: false };

const RiderStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="dashboard"
      screenOptions={options}
      drawerContent={(props) => <SideMenu {...props} />}>
      <Drawer.Screen name="dashboard" component={Dashboard} />
    </Drawer.Navigator>
  );
};

export default RiderStack;
