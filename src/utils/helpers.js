import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { store } from '../store';
import { RESET_LOADER } from '../store/actions/types';

// Geocoder.init('AIzaSyCK_4fZKdjxO7wy6nv2EQaEXOp1_So5rlU', { language: 'en' });

// export const getCurrentLocation = async () => {
//   Geolocation.getCurrentPosition(
//     async ({ coords: { latitude, longitude } }) => {
//       const response = await Geocoder.from({ latitude, longitude });
//       const address = response.results[0].formatted_address;
//       const shortAddress = address.substring(0, address.indexOf(','));
//       console.log('rssss', response, shortAddress);
//       return {
//         address: shortAddress,
//         lat: latitude,
//         lng: longitude,
//       };
//     },
//     (error) => {
//       console.log('errrss', error);
//       return { error: error };
//     },
//     options,
//   );
// };

export const checkAuth = async () => {
  store.dispatch({ type: RESET_LOADER });
  const id = await store.getState().user.profile?.id;
  const isAuth = !!id;
  return isAuth;
};
