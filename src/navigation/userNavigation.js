import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../screens/user/home';
import SideMenu from '../screens/user/drawer';

const Drawer = createDrawerNavigator();

const UserStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="home"
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <SideMenu {...props} />}>
      <Drawer.Screen name="home" component={Home} />
    </Drawer.Navigator>
  );
};

export default UserStack;
