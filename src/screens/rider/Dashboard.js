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
import Haversine from 'haversine';
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
import { regionFrom, getLatLonDiffInMeters } from '../../utils/helpers';
const { GOOGLE_API_KEY } = Config;
Geocoder.init(GOOGLE_API_KEY, { language: 'en' });

// GeoLocation option
const options = {
  timeout: 20000,
  enableHighAccuracy: true,
  maximumAge: 1000,
  distanceFilter: 10,
};

const Dashboard = ({ navigation }) => {
  const { profile } = useSelector((state) => state.rider);
  const [region, setRegion] = useState(null); // for storing the current location of the rider
  const [accuracy, setAccuracy] = useState(null); // for storing the accuracy of the location

  const [hasTrip, setHasTrip] = useState(false); // whether the driver has a trip (once they agree to a request, this becomes true)
  const [tripUser, setTripUser] = useState(null); // for storing the passenger info
  const [tripData, setTripData] = useState(null);

  const [isNearby, setIsNearby] = useState(false); // whether the nearby alert has already been issued
  const [nearbyAlert, setNearbyAlert] = useState(false); // whether the nearby alert has already been issued
  const [tripCompleted, setTripCompleted] = useState(false); // whether the trip has already ridden the vehicle

  // const [watchId, setWatchId] = useState(null);

  const [hasRequest, setHasRequest] = useState(false);
  const [requestData, setRequestData] = useState(null);
  const mapView = useRef();
  const dispatch = useDispatch();
  const watchId = useRef(null);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
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
    }

    return () => {
      if (watchId.current) {
        console.log('GEOLOCATION WATCH: stop watch');
        Geolocation.clearWatch(watchId.current);
        watchId.current = null;
      }
      isMounted = false;
    };
  }, [hasTrip]);

  // switch location watch
  // useEffect(() => {
  //   console.log('START GEOLOCATION WATCH', watchId.current);
  //   if (watchId.current) {
  //     console.log('GEOLOCATION WATCH: stop watch');
  //     Geolocation.clearWatch(watchId.current);
  //     watchId.current = null;
  //   }
  //   if (hasTrip) {
  //     watchId.current = Geolocation.watchPosition(
  //       async (position) => {
  //         const newRegion = regionFrom(
  //           position.coords.latitude,
  //           position.coords.longitude,
  //           position.coords.accuracy,
  //         );
  //         setRegion(newRegion);
  //         setAccuracy(position.coords.accuracy);
  //         console.log('getLocation....hasTrip', requestData);
  //         socket.emit('TRIP_RIDER_LOCATION', {
  //           rider: profile._id,
  //           location: { lat: newRegion.latitude, lng: newRegion.longitude },
  //           accuracy: position.coords.accuracy,
  //           user: requestData.user._id,
  //         });

  //         // next: add code for sending driver's current location to passenger
  //         const userRiderDiffMetter = getLatLonDiffInMeters(
  //           position.coords.latitude,
  //           position.coords.longitude,
  //           requestData.pickupAddress.latlng.lat,
  //           requestData.pickupAddress.latlng.lng,
  //         );
  //         console.log('distance diff', userRiderDiffMetter);
  //         if (userRiderDiffMetter <= 20) {
  //           console.log('rider is very near to user');
  //           if (!tripCompleted) {
  //             // inform user that the rider is very near
  //             socket.emit('RIDER_NEARBY', { userId: requestData.user._id });
  //           }
  //         } else if (userRiderDiffMetter <= 50) {
  //           console.log('rider getting close....');
  //         }
  //       },
  //       (error) => {
  //         console.log('errrrr', error);
  //       },
  //       options,
  //     );
  //   } else {
  //     watchId.current = Geolocation.watchPosition(
  //       async (position) => {
  //         const newRegion = regionFrom(
  //           position.coords.latitude,
  //           position.coords.longitude,
  //           position.coords.accuracy,
  //         );
  //         setRegion(newRegion);
  //         setAccuracy(position.coords.accuracy);
  //         socket.emit('RIDER_LOCATION_UPDATE', {
  //           rider: profile._id,
  //           location: { lat: newRegion.latitude, lng: newRegion.longitude },
  //           accuracy: position.coords.accuracy,
  //         });
  //       },
  //       (error) => {
  //         console.log('errrrr', error);
  //       },
  //       options,
  //     );
  //   }

  //   return () => {
  //     if (watchId.current) {
  //       console.log('GEOLOCATION WATCH: stop watch');
  //       Geolocation.clearWatch(watchId.current);
  //       watchId.current = null;
  //     }
  //   };
  // }, [hasTrip]);

  const handleSockets = () => {
    socket.on('connect', () => {
      // emit USER_ONLINE event
      socket.emit('RIDER_ONLINE', {
        socket: socket.id,
        user: profile._id,
        room: profile.socketRoom,
      });
      dispatch({ type: UPDATE_RIDER_SOCKET, payload: socket.id });

      // New dispatch request
      socket.on('NEW_REQUEST', (data) => {
        updateHasRequest(data);
      });
    });
  };

  // New dispatch request
  const updateHasRequest = (data) => {
    console.log('new request data', data);
    setRequestData(data);
    setHasRequest(true);
  };

  const acceptRequest = async () => {
    const payload = {
      user: requestData.user.socketId,
      trip: requestData.trip,
      riderId: profile._id,
      room: profile.socketId,
    };
    // setTripUser(requestData.user);
    // setTripData()
    setHasTrip(true);
    const response = await apiService('user/accept_request', 'POST', payload);
    console.log('acceptRequest', response);
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

  const getLocation = async () => {
    console.log('getLocation START', watchId.current);
    if (watchId.current) {
      console.log('GEOLOCATION WATCH: stop watch');
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
    if (hasTrip) {
      watchId.current = Geolocation.watchPosition(
        async (position) => {
          const newRegion = regionFrom(
            position.coords.latitude,
            position.coords.longitude,
            position.coords.accuracy,
          );
          setRegion(newRegion);
          setAccuracy(position.coords.accuracy);
          console.log('getLocation....hasTrip', requestData);
          socket.emit('TRIP_RIDER_LOCATION', {
            rider: profile._id,
            location: { lat: newRegion.latitude, lng: newRegion.longitude },
            accuracy: position.coords.accuracy,
            heading: position.coords.heading,
            user: requestData.user._id,
          });

          // next: add code for sending driver's current location to passenger
          const userRiderDiffMetter = await getLatLonDiffInMeters(
            position.coords.latitude,
            position.coords.longitude,
            requestData.pickupAddress.latlng.lat,
            requestData.pickupAddress.latlng.lng,
          );
          const userRiderDiffMetter2 = Haversine(
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            {
              latitude: requestData.pickupAddress.latlng.lat,
              longitude: requestData.pickupAddress.latlng.lng,
            },
          );
          console.log('distance diff', userRiderDiffMetter);
          console.log('distance diff 2', userRiderDiffMetter2);
          if (userRiderDiffMetter <= 20) {
            console.log('rider is very near to user');
            if (!tripCompleted) {
              // inform user that the rider is very near
              socket.emit('RIDER_NEARBY', { userId: requestData.user._id });
            }
          } else if (userRiderDiffMetter <= 50) {
            console.log('rider getting close....');
          }
        },
        (error) => {
          console.log('errrrr', error);
        },
        options,
      );
    } else {
      watchId.current = Geolocation.watchPosition(
        async (position) => {
          console.log('gelo', position);
          const newRegion = regionFrom(
            position.coords.latitude,
            position.coords.longitude,
            position.coords.accuracy,
          );
          setRegion({
            ...newRegion,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
          setAccuracy(position.coords.accuracy);
          socket.emit('RIDER_LOCATION_UPDATE', {
            rider: profile._id,
            location: { lat: newRegion.latitude, lng: newRegion.longitude },
            accuracy: position.coords.accuracy,
          });
        },
        (error) => {
          console.log('errrrr', error);
        },
        options,
      );
    }
    // Geolocation.watchPosition(
    //   async (position) => {
    //     const newRegion = regionFrom(
    //       position.coords.latitude,
    //       position.coords.longitude,
    //       position.coords.accuracy,
    //     );
    //     setRegion(newRegion);
    //     setAccuracy(position.coords.accuracy);
    //     console.log('getLocation....', requestData);
    //     socket.emit('UPDATE_RIDER_LOCATION', {
    //       rider: profile._id,
    //       location: { lat: newRegion.latitude, lng: newRegion.longitude },
    //       accuracy: position.coords.accuracy,
    //     });
    //   },
    //   (error) => {
    //     console.log('errrrr', error);
    //   },
    //   options,
    // );
  };

  // const watchRiderLocation = async () => {
  //   const options = {
  //     timeout: 20000,
  //     enableHighAccuracy: true,
  //     maximumAge: 1000,
  //     distanceFilter: 10,
  //   };
  //   Geolocation.watchPosition(
  //     async (position) => {
  //       const newRegion = regionFrom(
  //         position.coords.latitude,
  //         position.coords.longitude,
  //         position.coords.accuracy,
  //       );
  //       setRegion(newRegion);
  //       setAccuracy(position.coords.accuracy);
  //       console.log('getLocation....', requestData);
  //       socket.emit('UPDATE_RIDER_LOCATION', {
  //         rider: profile._id,
  //         location: { lat: newRegion.latitude, lng: newRegion.longitude },
  //         accuracy: position.coords.accuracy,
  //       });
  //     },
  //     (error) => {
  //       console.log('errrrr', error);
  //     },
  //     options,
  //   );
  // };

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

  const callUser = () => {
    alert('Call user...');
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={region}
        showsUserLocation={true}
        followsUserLocation={true}
        loadingEnabled={true}
        showsTraffic={true}
        ref={mapView}>
        {hasTrip && (
          <Marker
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
