import React from 'react';
import { store } from '../store';
import { RESET_LOADER } from '../store/actions/types';
import { Star, StarHalf } from '../../assets/svgs';

export const checkUserAuth = async () => {
  store.dispatch({ type: RESET_LOADER });
  const userId = await store.getState().user.profile?.id;
  return !!userId;
};

export const checkRiderAuth = async () => {
  store.dispatch({ type: RESET_LOADER });
  const id = await store.getState().rider.profile?.id;
  return !!id;
};

export const getRating = (rating) => {
  return (
    <>
      <Star />
      <Star />
      <Star />
      <Star />
      <Star />
    </>
  );
};
