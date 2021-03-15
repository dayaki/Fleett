import { store } from '../store';
import { RESET_LOADER } from '../store/actions/types';

export const checkAuth = async () => {
  store.dispatch({ type: RESET_LOADER });
  const id = await store.getState().user.profile?.id;
  const isAuth = !!id;
  return isAuth;
};
