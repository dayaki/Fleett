import React from 'react';
import { useSelector } from 'react-redux';
import AuthStack from './authNavigation';
import RiderStack from './riderNavigation';
import UserStack from './userNavigation';

const MainStack = () => {
  const { rider, user } = useSelector((state) => state);

  const checkAuth = () => {
    let stack;
    if (rider.isAuthenticated) {
      stack = <RiderStack />;
    } else if (user.isAuthenticated) {
      stack = <UserStack />;
    } else {
      stack = <AuthStack />;
    }
    return stack;
  };

  return checkAuth();
};

export default MainStack;
