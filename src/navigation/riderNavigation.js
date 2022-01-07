import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SideMenu from '../screens/rider/SideMenu';
import Dashboard from '../screens/rider/Dashboard';
import Earnings from '../screens/rider/Earnings';

const Drawer = createDrawerNavigator();
const options = { headerShown: false };

const RiderStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="rider_dashboard"
      screenOptions={options}
      drawerContent={(props) => <SideMenu {...props} />}>
      <Drawer.Screen name="rider_dashboard" component={Dashboard} />
      <Drawer.Screen name="rider_earnings" component={Earnings} />
    </Drawer.Navigator>
  );
};

export default RiderStack;
