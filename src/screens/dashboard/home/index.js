import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Modal from 'react-native-modal';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { MenuIcon, Scooter, Search } from '../../../../assets/svgs';
import { RegularText, TitleText } from '../../../common';
import Address from './Address';
import { styles } from './styles';

// Geocoder.init('AIzaSyCK_4fZKdjxO7wy6nv2EQaEXOp1_So5rlU', { language: 'en' });

const Home = () => {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const [showModal, setShowModal] = useState(false);
  // const [location, setLocation] = useState('');
  const [region, setRegion] = useState({
    latitude: 6.524379,
    longitude: 3.379206,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    const options = {
      timeout: 2000,
      enableHighAccuracy: true,
      maximumAge: 1000,
    };

    Geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        console.log('latlng', latitude, longitude);
        // const response = await Geocoder.from({ latitude, longitude });
        // const address = response.results[0].formatted_address;
        // const shortAddress = address.substring(0, address.indexOf(','));
        setRegion({
          ...region,
          latitude,
          longitude,
        });
      },
      (error) => {
        console.log('errrrr', error);
        // alert(error.message)
      },
      options,
    );
  }, []);

  const chooseAddress = (address) => {
    console.log('selected address', address);
    setShowModal(false);
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
          loadingEnabled={true}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.menu}
          onPress={() => Actions.drawerOpen()}>
          <MenuIcon />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={styles.search}>
          <View style={styles.searchIcon}>
            <Scooter />
          </View>
          <Text style={styles.searchText}>Where to deliver?</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          <RegularText title="Nice to see you!" style={styles.contentText} />
          <TitleText
            title="Where do you want to deliver?"
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
        <Modal
          isVisible={showModal}
          hasBackdrop={false}
          deviceWidth={windowWidth}
          deviceHeight={windowHeight}
          animationIn="fadeInDownBig"
          style={styles.modal}>
          <Address
            onClose={() => setShowModal(!showModal)}
            onSelect={chooseAddress}
          />
        </Modal>
      </SafeAreaView>
    </>
  );
};

export default Home;
