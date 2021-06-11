import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';
import Config from 'react-native-config';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import { socket } from '../../utils/socket';
import { TitleText, RegularText } from '../../common';
import {
  RiderOffline,
  RiderOnline,
  RiderMenu,
  ForwardIcon,
  PhoneCall,
} from '../../../assets/svgs';
import { imagePlaceholder } from '../../../assets/images';
import { UPDATE_RIDER_SOCKET } from '../../store/actions/types';
import { dashboardStyles as styles } from './styles';
import { updateRiderStatus } from '../../store/actions/riderActions';
import apiService from '../../utils/apiService';
const { GOOGLE_API_KEY } = Config;
Geocoder.init(GOOGLE_API_KEY, { language: 'en' });

const Dashboard = ({ navigation }) => {
  const { profile } = useSelector((state) => state.rider);
  const [region, setRegion] = useState({
    latitude: 6.524379,
    longitude: 3.379206,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [hasRequest, setHasRequest] = useState(false);
  const [requestData, setRequestData] = useState(null);
  const [hasTrip, setHasTrip] = useState(false);
  const mapView = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    handleSockets();
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

  const handleSockets = () => {
    socket.on('connect', () => {
      // emit USER_ONLINE event
      socket.emit('RIDER_ONLINE', {
        socket: socket.id,
        user: profile._id,
        room: profile.socketRoom,
      });
      dispatch({ type: UPDATE_RIDER_SOCKET, payload: socket.id });

      socket.on('NEW_REQUEST', (data) => {
        setRequestData(data);
        updateHasRequest(true);
        console.log('new request data', data);
      });
    });
  };

  const callUser = () => {
    alert('Call user...');
  };

  const acceptRequest = async () => {
    const payload = {
      user: requestData.user.socketId,
      trip: requestData.trip,
      riderId: profile._id,
      room: profile.socketId,
    };
    // socket.emit('REQUEST_ACCEPTED', payload);
    setHasTrip(true);
    await apiService('user/accept_request', 'POST', payload);
  };

  const dismissRequest = async () => {
    const payload = {
      user: requestData.user._id,
      trip: requestData.trip,
      riderId: profile._id,
    };
    setHasRequest(false);
    setRequestData(null);
    await apiService('user/cancel_request', 'POST', payload);
  };

  const updateHasRequest = (value) => {
    console.log('calling he.....');
    setHasRequest(value);
  };

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
      timeout: 20000,
      enableHighAccuracy: true,
      maximumAge: 1000,
      distanceFilter: 10,
    };
    Geolocation.watchPosition(
      async ({ coords: { latitude, longitude } }) => {
        if (requestData) {
          console.log('new location...', { latitude, longitude });
          socket.emit('RIDER_LOCATION_UPDATE', {
            latitude,
            longitude,
            user: requestData.user.socketId,
          });
        } else {
          socket.emit('UPDATE_RIDER_LOCATION', {
            rider: profile._id,
            latitude,
            longitude,
          });
        }

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
    dispatch(updateRiderStatus({ user: profile._id, status: type }));
  };

  const RiderStatusView = () => (
    <View style={styles.onlineStatus}>
      <View style={styles.dash} />
      <View style={styles.onlineViews}>
        <View style={styles.onlineState}>
          {profile.status === 'online' ? <RiderOnline /> : <RiderOffline />}
          <View style={styles.onlineTexts}>
            <TitleText
              title={
                profile.status === 'online'
                  ? 'You’re online!'
                  : 'You’re offline!'
              }
              style={styles.onlineStatusTitle}
            />
            <RegularText
              title={
                profile.status === 'online'
                  ? 'Receiving dispatch requests'
                  : 'NOT Receiving dispatch requests'
              }
              style={styles.onlineStatusSub}
            />
          </View>
        </View>
        {profile.status === 'online' ? (
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
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.menu}
        onPress={() => navigation.toggleDrawer()}>
        <RiderMenu />
      </TouchableOpacity>
      <View style={styles.userData}>
        <View style={styles.amount}>
          <TitleText title={`₦${profile.earnings}`} style={styles.amountText} />
        </View>
        <View style={styles.avatar}>
          <Image
            source={profile.photo ? { uri: profile.photo } : imagePlaceholder}
            resizeMode="contain"
            style={styles.avatarImage}
          />
        </View>
      </View>
    </View>
  );

  const NewRequest = ({ user, pickup }) => (
    <View style={styles.requestModal}>
      <View style={[styles.newRequest, styles.onlineStatus]}>
        <TitleText
          title="New Dispatch Request"
          style={styles.newRequestTitle}
        />
        <View style={styles.newRequestUser}>
          <View>
            <TitleText
              title={`${user.fname} ${user.lname}`}
              style={styles.newRequestName}
            />
            <RegularText
              title={pickup.address}
              style={styles.newRequestAddress}
            />
            <TitleText
              title="₦1,350 (Delivery to 1 location(s))"
              style={styles.newRequestNotes}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.newRequestPhone}
            onPress={callUser}>
            <PhoneCall />
          </TouchableOpacity>
        </View>
        <View style={styles.newRequestFooter}>
          <RegularText
            title="Dismiss"
            style={styles.dismissText}
            onPress={dismissRequest}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.acceptBtn}
            onPress={() => acceptRequest()}>
            <RegularText title="Accept" style={styles.acceptBtnText} />
            <ForwardIcon />
          </TouchableOpacity>
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
        followsUserLocation={true}
        loadingEnabled={true}
        minZoomLevel={10}
        ref={mapView}>
        {hasTrip && (
          <MapView.Marker
            coordinate={{
              latitude: requestData.pickupAddress.latlng.lat,
              longitude: requestData.pickupAddress.latlng.lng,
            }}
            title={'Your pickup location.'}
            pinColor={'#4CDB00'}
          />
        )}
      </MapView>
      <RiderHeader />
      {!hasRequest ? (
        <RiderStatusView />
      ) : (
        !hasTrip && (
          <NewRequest
            user={requestData.user}
            pickup={requestData.pickupAddress}
          />
        )
      )}
    </View>
  );
};

export default Dashboard;
