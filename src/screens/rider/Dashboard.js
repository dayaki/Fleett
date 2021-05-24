import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';
import Config from 'react-native-config';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import { TitleText, RegularText } from '../../common';
import { RiderOffline, RiderOnline, RiderMenu } from '../../../assets/svgs';
import { dashboardStyles as styles } from './styles';
import { updateRiderStatus } from '../../store/actions/riderActions';
const { GOOGLE_API_KEY } = Config;
Geocoder.init(GOOGLE_API_KEY, { language: 'en' });

const Dashboard = () => {
  const {
    profile: { rider },
  } = useSelector((state) => state.rider);
  const [region, setRegion] = useState({
    latitude: 6.524379,
    longitude: 3.379206,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const mapView = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    } else {
      Geolocation.requestAuthorization('whenInUse').then((status) => {
        if (status === 'granted' || 'restricted') {
          getLocation();
        }
      });
    }
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Fleett Location Permission',
          message:
            'Fleett needs access to your location ' +
            'to show you to closest customer.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getLocation();
      } else {
        console.log('location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getLocation = () => {
    const options = {
      timeout: 15000,
      enableHighAccuracy: true,
      maximumAge: 10000,
    };
    Geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        setRegion({
          ...region,
          latitude,
          longitude,
        });
      },
      (error) => {
        console.log('errrrr', error);
      },
      options,
    );
  };

  const handleStatus = (type) => {
    dispatch(updateRiderStatus({ user: rider.user_id, type }));
  };

  const RiderStatusView = () => (
    <View style={styles.onlineStatus}>
      <View style={styles.dash} />
      <View style={styles.onlineViews}>
        <View style={styles.onlineState}>
          {rider.status === 'online' ? <RiderOnline /> : <RiderOffline />}
          <View style={styles.onlineTexts}>
            <TitleText
              title={
                rider.status === 'online' ? 'You’re online!' : 'You’re offline!'
              }
              style={styles.onlineStatusTitle}
            />
            <RegularText
              title={
                rider.status === 'online'
                  ? 'Receiving dispatch requests'
                  : 'NOT Receiving dispatch requests'
              }
              style={styles.onlineStatusSub}
            />
          </View>
        </View>
        {rider.status === 'online' ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleStatus('offline')}
            style={styles.actionButton}>
            <RegularText title="Go Offline" style={styles.actionButtonText} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.actionButton2}
            onPress={() => handleStatus('online')}>
            <RegularText title="Go" style={styles.actionButtonText} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const RiderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.8} style={styles.menu}>
        <RiderMenu />
      </TouchableOpacity>
      <View style={styles.userData}>
        <View style={styles.amount}>
          <TitleText title="₦22,450" style={styles.amountText} />
        </View>
        <View style={styles.avatar}>
          <Image
            source={require('../../../assets/images/user_placeholder.jpeg')}
            resizeMode="contain"
            style={styles.avatarImage}
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={region}
        showsUserLocation={true}
        loadingEnabled={true}
        minZoomLevel={10}
        ref={mapView}
      />
      <RiderHeader />
      <RiderStatusView />
    </View>
  );
};

export default Dashboard;
