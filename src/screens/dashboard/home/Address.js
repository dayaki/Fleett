import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {
  Close,
  PlusIcon,
  MapPin,
  Clock,
  Cancel,
} from '../../../../assets/svgs';
import { RegularText, TitleText } from '../../../common';
import { modalStyles as styles } from './styles';

const Address = ({ onClose, onSelect }) => {
  const [title, setTitle] = useState('Select destination');
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
                value="Folarin Street 16"
                style={styles.addressInput}
                onFocus={() => handleFocus('pickup')}
              />
              <TextInput
                placeholder="Search destination"
                placeholderTextColor="rgba(127,129,142,1)"
                style={styles.addressInput}
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
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => onSelect('hello world')}
            style={styles.addressView}>
            <View style={styles.addressViewIcon}>
              <MapPin />
            </View>
            <View style={styles.addressViewInfo}>
              <RegularText
                title="16 Folarin Street"
                style={styles.addressStreet}
              />
              <RegularText title="Lekki, Lagos" style={styles.addressState} />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Address;
