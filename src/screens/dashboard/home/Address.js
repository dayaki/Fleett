import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';
import Config from 'react-native-config';
import debounce from 'lodash/debounce';
import { Close, PlusIcon, MapPin } from '../../../../assets/svgs';
import { RegularText, TitleText } from '../../../common';
import { modalStyles as styles } from './styles';

const { GOOGLE_API_KEY } = Config;

const Address = ({ onClose, onSelect, latlng, pickupAddress }) => {
  const [title, setTitle] = useState('Select destination');
  const [destination, setDestination] = useState('');
  const [predictions, setPredictions] = useState([]);

  const updateQuery = async () => {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GOOGLE_API_KEY}&input=${destination}&location=${
      (latlng.lat, latlng.lng)
    }&radius=2000`;
    try {
      const result = await fetch(apiUrl);
      const json = await result.json();
      console.log('result', json);
      setPredictions(json.predictions);
    } catch (error) {
      console.error('errr', error);
    }
  };

  const delayedQuery = useCallback(debounce(updateQuery, 1000), [destination]);

  useEffect(() => {
    delayedQuery();
    return delayedQuery.cancel;
  }, [destination, delayedQuery]);

  const changeDestination = async (dest) => {
    setDestination(dest);
  };

  const handleFocus = (type) => {
    if (type === 'pickup') {
      setTitle('Select pick-up location');
    } else {
      setTitle('Select destination');
    }
  };

  return (
    <SafeAreaView style={styles.safeview}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.navbar}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.navbarBtn}
              onPress={onClose}>
              <Close />
            </TouchableOpacity>
            <TitleText title={title} style={styles.navbarTitle} />
          </View>
          <View style={styles.addressInputs}>
            {/* <View style={styles.addressIcon}></View> */}
            <View style={styles.inputs}>
              <TextInput
                value={pickupAddress}
                style={styles.addressInput}
                onFocus={() => handleFocus('pickup')}
              />
              <TextInput
                placeholder="Search destination"
                placeholderTextColor="rgba(127,129,142,1)"
                style={styles.addressInput}
                value={destination}
                onChangeText={changeDestination}
                autoFocus
                onFocus={() => handleFocus('destination')}
              />
              <TouchableOpacity style={styles.addAddress}>
                <PlusIcon />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.searchAddresses}>
          {predictions.length > 0 &&
            predictions.map((prediction) => (
              <TouchableOpacity
                key={prediction.place_id}
                activeOpacity={0.9}
                onPress={() => onSelect(prediction)}
                style={styles.addressView}>
                <View style={styles.addressViewIcon}>
                  <MapPin />
                </View>
                <View style={styles.addressViewInfo}>
                  <RegularText
                    title={prediction.structured_formatting.main_text}
                    style={styles.addressStreet}
                  />
                  <RegularText
                    title={prediction.structured_formatting.secondary_text}
                    style={styles.addressState}
                  />
                </View>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Address;
