import React from 'react';
import { store } from '../store';
import { RESET_LOADER } from '../store/actions/types';
import { Star, StarHalf } from '../../assets/svgs';

export const regionFrom = (lat, lon, accuracy) => {
  const oneDegreeOfLongitudeInMeters = 111.32 * 1000;
  const circumference = (40075 / 360) * 1000;

  const latDelta = accuracy * (1 / (Math.cos(lat) * circumference));
  const lonDelta = accuracy / oneDegreeOfLongitudeInMeters;

  return {
    latitude: lat,
    longitude: lon,
    latitudeDelta: Math.max(0, latDelta),
    longitudeDelta: Math.max(0, lonDelta),
  };
};

export const getLatLonDiffInMeters = async (lat1, lon1, lat2, lon2) => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d * 1000;
};

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

export const toMoney = (num) => {
  return parseFloat(num)
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};
