import {
  createNavigationContainerRef,
  DrawerActions,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const navigate = (name, params) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

export const drawerToggle = () => {
  navigationRef.dispatch(DrawerActions.toggleDrawer());
};

// export const setTopLevelNavigator = (navigatorRef) => {
//   _navigator = navigatorRef;
// };

// function navigateToTab(routeName, params = {}) {
//   _navigator.dispatch(
//     CommonActions.navigate({
//       name: routeName,
//     }),
//   );
// }

// function navigateToScreen(routeName, screenName = {}) {
//   _navigator.dispatch(
//     CommonActions.navigate(routeName, { screen: screenName }),
//   );
// }

// const navigate = (routeName) => {
//   _navigator.dispatch(CommonActions.navigate(routeName));
// };

// const goBack = () => {
//   _navigator.dispatch(CommonActions.goBack());
// };

// function search() {
//   _navigator.dispatch(CommonActions.navigate('search'));
// }

// // add other navigation functions that you need and export them

// export default {
//   navigate,
//   search,
//   setTopLevelNavigator,
//   drawerToggle,
//   goBack,
//   navigateToTab,
//   navigateToScreen,
// };
