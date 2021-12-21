import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SideMenu from '../screens/user/drawer';
import Home from '../screens/user/home';
import History from '../screens/user/order/History';
import About from '../screens/about';

const Drawer = createDrawerNavigator();

const UserStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="home"
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <SideMenu {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="History" component={History} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  );
};

export default UserStack;
