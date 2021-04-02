import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Cancel } from '../../../../assets/svgs';
import { TitleText } from '../../../common';
import { styles } from './styles';

const PaymentOptions = () => {
  return (
    <View>
      <TouchableOpacity activeOpacity={0.8}>
        <Cancel />
      </TouchableOpacity>
      <TitleText title="Payment options" style={styles.title} />
    </View>
  );
};

export default PaymentOptions;
