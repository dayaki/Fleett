import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  useWindowDimensions,
  Platform,
  Linking,
  Image,
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
import { regionFrom } from '../../../utils/helpers';
// import { savePickupAddress } from '../../../store/actions/userActions';

const { GOOGLE_API_KEY } = Config;
Geocoder.init(GOOGLE_API_KEY, { language: 'en' });

const Home = () => {
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
  const [tempTrip, setTempTrip] = useState(null);
  const [hasOrder, setHasOrder] = useState(null);
  const [hasError, setHasError] = useState(null);
  const [riderLocation, setRiderLocation] = useState(null);
  const [rider, setRider] = useState(null);
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
    // let isMounted = true;
    // if (isMounted) {
    //   handleSockets();
    //   locationPermission();
    // }

    // return () => {
    //   isMounted = false;
    // };
    // handleSockets();
    // locationPermission();
    socket.on('connect', () => {
      socket.emit('USER_ONLINE', {
        socket: socket.id,
        user: profile._id,
        room: profile.socketRoom,
      });
      dispatch({ type: UPDATE_USER_SOCKET, payload: socket.id });

      socket.on('NO_RIDERS', () => {
        setTempRider(null);
        setIsFetching(false);
        setHasError({
          title: 'Riders are busy now',
          label: 'Please try again in a few minutes.',
        });
      });

      socket.on('RIDE_ACCEPTED', (data) => {
        console.log('rider accepted', data, rider);
        updateHasOrder(data);
      });

      socket.on('RIDER_LOCATION_UPDATE', (data) => {
        console.log('RIDER_LOCATION_UPDATE', data);
        updateRiderLocation(data);
      });
    });

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
          setPickupAddress(address);
          setRegion((prevRegion) => ({
            ...prevRegion,
            latitude,
            longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }));
        },
        (error) => {
          console.log('errrrr', error);
        },
        options,
      );
    };

    getLocation();
  }, [dispatch, profile]);

  useEffect(() => {
    console.log('tempssss', tempTrip?._id, tempRider?._id);
    if (tempTrip && tempRider && !hasOrder) {
      setTimeout(() => {
        setIsFetching(true);
        console.log('no RIDER yet....', tempRider._id, tempTrip._id);
        apiService('user/re_route', 'POST', {
          user: profile._id,
          riderId: tempRider._id,
          trip: tempTrip._id,
        })
          .then(({ data }) => {
            console.log('search AGAIN', data);
            setTempRider(data.rider);
            setTempTrip(data.trip);
          })
          .catch((err) => {
            console.log('search AGAIN error', err);
            setHasError({
              title: 'Riders are busy now',
              label: 'Please try again in a few minutes.',
            });
            setIsFetching(false);
            setTempRider(null);
            setTempTrip(null);
          });
      }, 30000);
    }
  }, [tempTrip, hasOrder, tempRider, profile]);

  // const handleSockets = () => {
  //   socket.on('connect', () => {
  //     socket.emit('USER_ONLINE', {
  //       socket: socket.id,
  //       user: profile._id,
  //       room: profile.socketRoom,
  //     });
  //     dispatch({ type: UPDATE_USER_SOCKET, payload: socket.id });

  //     socket.on('NO_RIDERS', () => {
  //       // updateHasError();
  //       setTempRider(null);
  //       setIsFetching(false);
  //       setHasError({
  //         title: 'Riders are busy now',
  //         label: 'Please try again in a few minutes.',
  //       });
  //     });

  //     socket.on('RIDE_ACCEPTED', (data) => {
  //       console.log('rider accepted', data);
  //       updateHasOrder(data);
  //     });

  //     socket.on('RIDER_LOCATION_UPDATE', (data) => {
  //       console.log('RIDER_LOCATION_UPDATE', data);
  //       updateRiderLocation(data);
  //     });
  //   });
  // };

  const updateRiderLocation = (data) => {
    const regionn = regionFrom(
      data.location.lat,
      data.location.lng,
      data.accuracy,
    );
    regionn.heading = data.heading;
    console.log('updateRiderLocation', regionn);
    setRiderLocation(regionn);
    setRegion(regionn);
    setRider({
      lat: data.location.lat,
      lng: data.location.lng,
    });
  };

  const updateHasOrder = (data) => {
    const regionn = regionFrom(
      data.rider.location.lat,
      data.rider.location.lng,
      data.rider.location.accuracy,
    );
    setRiderLocation(regionn);
    setRider({
      lat: data.rider.location.lat,
      lng: data.rider.location.lng,
      accuracy: data.rider.location.accuracy,
    });
    setHasOrder(data);
    setIsFetching(false);
  };

  const changePickupAddress = ({ description }) => {
    setPickupAddress(description);
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
          setTempRider(data.rider);
          setTempTrip(data.trip);
          // handleRiderReroute();
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
          showsMyLocationButton={false}
          loadingEnabled={false}
          minZoomLevel={10}
          ref={mapView}>
          {hasOrder && (
            <Marker
              flat
              coordinate={{
                latitude: riderLocation.latitude,
                longitude: riderLocation.longitude,
              }}>
              <Image
                source={require('../../../../assets/images/bike_1.png')}
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: 'contain',
                  transform: [
                    {
                      rotate: `${
                        riderLocation.heading ? riderLocation.heading : 180
                      }deg`,
                    },
                  ],
                }}
              />
            </Marker>
          )}
          {destination && !hasOrder && (
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
                    right: windowWidth / 50,
                    bottom: windowHeight / 50,
                    left: windowWidth / 50,
                    top: windowHeight / 50,
                  },
                });
              }}
            />
          )}
        </MapView>

        <NavButton onReset={resetNav} isBack={!!(destination && !tempRider)} />

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
