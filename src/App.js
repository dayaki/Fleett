import React, { useEffect } from 'react';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { setCustomText, setCustomImage } from 'react-native-global-props';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import { RootSiblingParent } from 'react-native-root-siblings';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import OneSignal from 'react-native-onesignal';
import { navigationRef } from './navigation/navigationService';
import MainStack from './navigation';
import { persistor, store } from './store';

const customTextProps = {
  style: {
    fontFamily: 'TTNormsPro-Regular',
    fontSize: 15,
  },
};

const customImageProps = {
  resizeMode: 'cover',
};

setCustomText(customTextProps);
setCustomImage(customImageProps);

// Add a request interceptor
axios.interceptors.request.use((config) => {
  const token =
    store.getState().user.profile?.token ||
    store.getState().rider.profile?.token;
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const App = () => {
  useEffect(() => {
    oneSignalInit();
    locationPermission();
    SplashScreen.hide();
  }, []);

  const oneSignalInit = async () => {
    /* O N E S I G N A L   S E T U P */
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId('1f2468aa-1ffd-496d-a94b-3b4eabbb8c4e');

    OneSignal.promptForPushNotificationsWithUserResponse((response) => {
      console.log('Prompt response:', response);
    });

    OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceivedEvent) => {
        console.log(
          'OneSignal: notification will show in foreground:',
          notificationReceivedEvent,
        );
        const notification = notificationReceivedEvent.getNotification();
        console.log('notification: ', notification);
        const data = notification.additionalData;
        console.log('additionalData: ', data);
        const button1 = {
          text: 'Cancel',
          onPress: () => {
            notificationReceivedEvent.complete();
          },
          style: 'cancel',
        };
        const button2 = {
          text: 'Complete',
          onPress: () => {
            notificationReceivedEvent.complete(notification);
          },
        };
        Alert.alert('Complete notification?', 'Test', [button1, button2], {
          cancelable: true,
        });
      },
    );

    OneSignal.setNotificationOpenedHandler((notification) => {
      console.log('OneSignal: notification opened:', notification);
    });

    const deviceState = await OneSignal.getDeviceState();
    console.log('Device state', deviceState);
  };

  const locationPermission = async () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Fleett Location Permission',
          message:
            'Fleett needs access to your location ' +
            'to show you closest riders to you.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
    } else {
      Geolocation.requestAuthorization('whenInUse');
    }
  };

  return (
    <Provider store={store}>
      <RootSiblingParent>
        <PersistGate persistor={persistor}>
          <NavigationContainer ref={navigationRef}>
            <MainStack />
          </NavigationContainer>
        </PersistGate>
      </RootSiblingParent>
    </Provider>
  );
};

export default App;
