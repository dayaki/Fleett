import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  useWindowDimensions,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Config from 'react-native-config';
import socketIOClient from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Modal from 'react-native-modal';
import MapViewDirections from 'react-native-maps-directions';
import Geocoder from 'react-native-geocoding';
import RBSheet from 'react-native-raw-bottom-sheet';
import Address from './Address';
import {
  InitialView,
  InitialOrder,
  NavButton,
  PaymentOptions,
  RequestingView,
  RiderPopView,
} from './utils';
import { styles } from './styles';
import apiService from '../../../utils/apiService';

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
  const [region, setRegion] = useState({
    latitude: 6.524379,
    longitude: 3.379206,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const mapView = useRef();
  const refRBSheet = useRef();

  useEffect(() => {
    // const socket = socketIOClient('https://fleett.herokuapp.com');
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

  const handleDispatch = () => {
    setIsFetching(true);
    apiService('user/search', 'POST', latlng)
      .then(({ data }) => {
        console.log('search', data);
        if (data) {
          setTempRider(data);
        }
      })
      .catch((err) => {
        console.log('search error', err);
      });
  };

  const resetNav = () => {
    setDestination(null);
    setTempRider(null);
    setIsFetching(false);
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
            {tempRider && <RiderPopView name={tempRider.fname} time="3 mins" />}
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
            pickupAddress={pickupAddress}
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
