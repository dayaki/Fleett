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
      initialRouteName="user_home"
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <SideMenu {...props} />}>
      <Drawer.Screen name="user_home" component={Home} />
      <Drawer.Screen name="user_history" component={History} />
      <Drawer.Screen name="user_about" component={About} />
    </Drawer.Navigator>
  );
};

export default UserStack;
