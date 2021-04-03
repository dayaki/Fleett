import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  Cash,
  CheckMark,
  BackArrow,
  MenuIcon,
  Unavailable,
  Search,
} from '../../../../assets/svgs';
import { RegularText, TitleText, Button } from '../../../common';
import { masterCard } from '../../../../assets/images';
import { styles } from './styles';

export const InitialView = ({ showModal }) => (
  <View style={styles.content}>
    <RegularText title="Nice to see you!" style={styles.contentText} />
    <TitleText
      title="What's your delivery destination?"
      style={styles.contentTitle}
    />
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.contentSearch}
      onPress={showModal}>
      <Search fill="#AEAEAE" />
      <RegularText
        title="Search destination"
        style={styles.contentSearchText}
      />
    </TouchableOpacity>
  </View>
);

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

export const RequestingView = ({ onCancel }) => {
  return (
    <View style={styles.requesting}>
      <TitleText
        title="Requesting a dispatch rider..."
        style={styles.requestingTitle}
      />
      <Button
        title="Cancel request"
        onPress={onCancel}
        style={styles.requestingBtn}
        textStyle={styles.requestingBtnText}
      />
    </View>
  );
};

export const NavButton = ({ isBack, onReset }) => {
  return isBack ? (
    <TouchableOpacity activeOpacity={0.8} style={styles.menu} onPress={onReset}>
      <BackArrow />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.menu}
      onPress={() => Actions.drawerOpen()}>
      <MenuIcon />
    </TouchableOpacity>
  );
};

export const UnavailableView = () => (
  <>
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
  </>
);

{
  /* <TouchableOpacity activeOpacity={0.8} style={styles.search}>
          <View style={styles.searchIcon}>
            <Scooter />
          </View>
          <Text style={styles.searchText}>Where to deliver?</Text>
        </TouchableOpacity> */
}
