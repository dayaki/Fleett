import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  useWindowDimensions,
  PermissionsAndroid,
  Platform,
  Linking,
} from 'react-native';
import Config from 'react-native-config';
import { useSelector, useDispatch } from 'react-redux';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Modal from 'react-native-modal';
import MapViewDirections from 'react-native-maps-directions';
import Geocoder from 'react-native-geocoding';
import RBSheet from 'react-native-raw-bottom-sheet';
import { socket } from '../../../utils/socket';
import Address from './Address';
import {
  InitialView,
  InitialOrder,
  NavButton,
  PaymentOptions,
  RequestingView,
  RiderPopView,
  ErrorPopView,
  OrderView,
} from './utils';
import { styles } from './styles';
import apiService from '../../../utils/apiService';
import { UPDATE_USER_SOCKET } from '../../../store/actions/types';
const { GOOGLE_API_KEY } = Config;
Geocoder.init(GOOGLE_API_KEY, { language: 'en' });

const Home = ({ navigation }) => {
  const { profile } = useSelector((state) => state.user);
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const [showModal, setShowModal] = useState(false);
  const [latlng, setLatlng] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [destination, setDestination] = useState(null);
  const [paymentType, setPaymentType] = useState('pod');
  const [isFetching, setIsFetching] = useState(false);
  const [tempRider, setTempRider] = useState(null);
  const [hasOrder, setHasOrder] = useState(null);
  const [hasError, setHasError] = useState(null);
  const [region, setRegion] = useState({
    latitude: 6.524379,
    longitude: 3.379206,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const mapView = useRef();
  const refRBSheet = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    handleSockets();
    // const socket = socketIOClient('http://bbb3bfb98f18.ngrok.io/');
    // // socket.emit('join room', profile.socketRoom);
    // socket.on('connect', () => {
    //   console.log('socket id', socket.id);
    //   socket.emit('new connection', { socket: socket.id, userId: profile._id });
    // });
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
      socket.emit('USER_ONLINE', {
        socket: socket.id,
        user: profile._id,
        room: profile.socketRoom,
      });
      dispatch({ type: UPDATE_USER_SOCKET, payload: socket.id });

      socket.on('NO_RIDERS', () => {
        // updateHasError();
        setTempRider(null);
        setIsFetching(false);
        setHasError({
          title: 'Riders are busy now',
          label: 'Please try again in a few minutes.',
        });
      });

      socket.on('RIDE_ACCEPTED', (data) => {
        console.log('rider accepted', data);
        updateHasOrder(data);
      });

      socket.on('RIDER_LOCATION_UPDATE', (data) => {
        console.log('RIDER_LOCATION_UPDATE', data);
      });
    });
  };

  const updateHasOrder = (data) => {
    setHasOrder(data);
    setIsFetching(false);
  };

  // const updateHasError = (value) => {
  //   setTempRider(null);
  //   setIsFetching(false);
  //   setHasError({
  //     title: 'Riders are busy now',
  //     label: 'Please try again in a few minutes.',
  //   });
  // };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
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
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getLocation();
      } else {
        console.log('location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const changePickupAddress = ({ description }) => {
    console.log('data', description);
    setPickupAddress(description);
  };

  const getLocation = () => {
    const options = {
      timeout: 15000,
      enableHighAccuracy: true,
      maximumAge: 10000,
    };
    Geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        setLatlng({ lat: latitude, lng: longitude });
        const response = await Geocoder.from({ latitude, longitude });
        const address = response.results[0].formatted_address;
        console.log('pickupAddress', address);
        // const shortAddress = address.substring(0, address.indexOf(','));
        setPickupAddress(address);
        // console.log('shortAddress', shortAddress);
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

  const chooseAddress = async (address) => {
    console.log('selected address', address);
    setShowModal(false);
    const response = await Geocoder.from(address.description);
    console.log('resssss', response);
    setDestination({ address, latlng: response.results[0].geometry.location });
  };

  const choosePayType = (type) => {
    setPaymentType(type);
    refRBSheet.current.close();
  };

  // Initial search
  const handleDispatch = () => {
    setHasError(null);
    setIsFetching(true);
    const searchData = {
      pickupAddress: {
        latlng,
        address: pickupAddress,
      },
      destinationAddress: {
        latlng: destination.latlng,
        address: destination.address.description,
      },
    };
    apiService('user/search', 'POST', searchData)
      .then(({ data }) => {
        console.log('search', data);
        if (data) {
          setTempRider(data);
        } else {
          setHasError({
            title: 'Riders are busy now',
            label: 'Please try again in a few minutes.',
          });
        }
      })
      .catch((err) => {
        console.log('search error', err);
        setHasError({
          title: 'Riders are busy now',
          label: 'Please try again in a few minutes.',
        });
        setIsFetching(false);
      });
    // .finally(() => {
    //   setIsFetching(false);
    // });
  };

  const resetNav = () => {
    setHasError(null);
    setDestination(null);
    setTempRider(null);
    setIsFetching(false);
  };

  const handleCallRider = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <>
      <SafeAreaView style={styles.safeview}>
        <StatusBar
          backgroundColor={Platform.OS === 'android' ? 'white' : 'black'}
          barStyle="dark-content"
        />
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
          showsUserLocation={true}
          loadingEnabled={true}
          minZoomLevel={10}
          ref={mapView}>
          {destination && (
            <MapViewDirections
              origin={{ latitude: latlng.lat, longitude: latlng.lng }}
              destination={{
                latitude: destination.latlng.lat,
                longitude: destination.latlng.lng,
              }}
              apikey={GOOGLE_API_KEY}
              strokeWidth={5}
              strokeColor="#5406CB"
              onReady={(result) => {
                mapView.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: windowWidth / 20,
                    bottom: windowHeight / 20,
                    left: windowWidth / 20,
                    top: windowHeight / 20,
                  },
                });
              }}
            />
          )}
        </MapView>

        <NavButton
          onReset={resetNav}
          isBack={destination && !tempRider ? true : false}
        />

        {!destination ? (
          <InitialView showModal={() => setShowModal(!showModal)} />
        ) : (
          <View style={styles.bottomSheet}>
            {hasOrder ? (
              <OrderView rider={hasOrder.rider} callRider={handleCallRider} />
            ) : (
              <>
                {tempRider && (
                  <RiderPopView name={tempRider.fname} time="5 mins" />
                )}
                {hasError && (
                  <ErrorPopView title={hasError.title} label={hasError.label} />
                )}
                {isFetching ? (
                  <RequestingView
                    onCancel={resetNav}
                    title={
                      tempRider
                        ? 'Connecting to the dispatch rider...'
                        : 'Looking for a dispatch rider...'
                    }
                  />
                ) : (
                  <InitialOrder
                    paymentType={paymentType}
                    handleDispatch={handleDispatch}
                    openRBSheet={() => refRBSheet.current.open()}
                  />
                )}
              </>
            )}
          </View>
        )}

        <Modal
          isVisible={showModal}
          hasBackdrop={false}
          deviceWidth={windowWidth}
          deviceHeight={windowHeight}
          animationIn="fadeInDownBig"
          style={styles.modal}>
          <Address
            address={pickupAddress}
            changeAddress={changePickupAddress}
            onClose={() => setShowModal(!showModal)}
            onSelect={chooseAddress}
            latlng={latlng}
          />
        </Modal>

        <RBSheet
          ref={refRBSheet}
          height={230}
          closeOnDragDown={false}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0,0,0,0.6)',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          <PaymentOptions onChoose={choosePayType} paymentType={paymentType} />
        </RBSheet>
      </SafeAreaView>
    </>
  );
};

export default Home;
