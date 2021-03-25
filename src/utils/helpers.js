import Geocoder from 'react-native-geocoding';
import { store } from '../store';
import { RESET_LOADER } from '../store/actions/types';

Geocoder.init('AIzaSyC3txceMWvnO5IwXxkOkMZ_EkK1RyE0Ad4', { language: 'en' });

export const checkAuth = async () => {
  store.dispatch({ type: RESET_LOADER });
  const id = await store.getState().user.profile?.id;
  const isAuth = !!id;
  return isAuth;
};
