import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Cash, CheckMark } from '../../../../assets/svgs';
import { RegularText, TitleText } from '../../../common';
import { masterCard } from '../../../../assets/images';
import { styles } from './styles';

export const PaymentOptions = ({ onChoose, paymentType }) => {
  return (
    <View style={styles.payOptions}>
      <TitleText title="Payment Methods" style={styles.payOptionsTitle} />
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.payOptionspayMethod}
        onPress={() => onChoose('card')}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={masterCard}
            resizeMode="cover"
            style={styles.mastercard}
          />
          <RegularText title="Pay before delivery" style={styles.paymentText} />
        </View>
        {paymentType === 'card' && <CheckMark />}
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.payOptionspayMethod}
        onPress={() => onChoose('cash')}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 6,
          }}>
          <Cash />
          <RegularText title="Pay with cash" style={styles.paymentText} />
        </View>
        {paymentType === 'cash' && <CheckMark />}
      </TouchableOpacity>
    </View>
  );
};
