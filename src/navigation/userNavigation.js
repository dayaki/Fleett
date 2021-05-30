import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../screens/dashboard/home';

const Drawer = createDrawerNavigator();

const UserStack = () => {
  return (
    <Drawer.Navigator initialRouteName="home">
      <Drawer.Screen name="home" component={Home} />
    </Drawer.Navigator>
  );
};

export default UserStack;
