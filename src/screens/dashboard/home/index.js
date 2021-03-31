import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StatusBar,
  useWindowDimensions,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Config from 'react-native-config';
import { Actions } from 'react-native-router-flux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Modal from 'react-native-modal';
import MapViewDirections from 'react-native-maps-directions';
import Geocoder from 'react-native-geocoding';
import {
  MenuIcon,
  Unavailable,
  ForwardArrow,
  BackArrow,
  Scooter,
  Search,
} from '../../../../assets/svgs';
import { RegularText, TitleText } from '../../../common';
import Address from './Address';
import { styles } from './styles';

const { GOOGLE_API_KEY } = Config;

Geocoder.init(GOOGLE_API_KEY, { language: 'en' });

const Home = () => {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const [showModal, setShowModal] = useState(false);
  const [latlng, setLatlng] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [destination, setDestination] = useState(null);
  const [region, setRegion] = useState({
    latitude: 6.524379,
    longitude: 3.379206,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

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
    const response = await Geocoder.from(
      address.structured_formatting.main_text,
    );
    console.log('resssss', response);
    setDestination({ address, latlng: response.results[0].geometry.location });
    setShowModal(false);
  };

  const resetNav = () => {
    setDestination(null);
  };

  return (
    <>
      <SafeAreaView style={styles.safeview}>
        <StatusBar backgroundColor="black" barStyle="dark-content" />
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={region}
          showsUserLocation={true}
          followsUserLocation={true}
          loadingEnabled={true}>
          {destination && (
            <MapViewDirections
              origin={{ latitude: latlng.lat, longitude: latlng.lng }}
              destination={{
                latitude: destination.latlng.lat,
                longitude: destination.latlng.lng,
              }}
              apikey={GOOGLE_API_KEY}
              strokeWidth={3}
              strokeColor="hotpink"
            />
          )}
        </MapView>
        {destination ? (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.menu}
            onPress={resetNav}>
            <BackArrow />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.menu}
            onPress={() => Actions.drawerOpen()}>
            <MenuIcon />
          </TouchableOpacity>
        )}

        {/* <TouchableOpacity activeOpacity={0.8} style={styles.search}>
          <View style={styles.searchIcon}>
            <Scooter />
          </View>
          <Text style={styles.searchText}>Where to deliver?</Text>
        </TouchableOpacity> */}

        {!destination ? (
          <View style={styles.content}>
            <RegularText title="Nice to see you!" style={styles.contentText} />
            <TitleText
              title="What's your delivery destination?"
              style={styles.contentTitle}
            />
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.contentSearch}
              onPress={() => setShowModal(true)}>
              <Search fill="#AEAEAE" />
              <RegularText
                title="Search destination"
                style={styles.contentSearchText}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.orderInfo}>
            <View style={styles.unavailable}>
              <Unavailable />
              <RegularText
                title="Unfortunately, Fleett is currently unavailable in your area."
                style={styles.unavailableText}
              />
            </View>

            <View style={styles.orderInfoFooter}>
              <ForwardArrow />
            </View>
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
      </SafeAreaView>
    </>
  );
};

export default Home;
