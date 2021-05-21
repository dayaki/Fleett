import { store } from '../store';
import { RESET_LOADER } from '../store/actions/types';
import { Star, StarHalf } from '../../assets/svgs';

export const checkUserAuth = async () => {
  store.dispatch({ type: RESET_LOADER });
  const id = await store.getState().user.profile?.id;
  const isAuth = !!id;
  return isAuth;
};

export const checkRiderAuth = async () => {
  store.dispatch({ type: RESET_LOADER });
  const id = await store.getState().rider.profile?.id;
  const isAuth = !!id;
  return isAuth;
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
