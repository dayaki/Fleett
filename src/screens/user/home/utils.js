import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import {
  Cash,
  CheckMark,
  BackArrow,
  MenuIcon,
  Unavailable,
  Search,
  Scooter,
  RightArrow,
} from '../../../../assets/svgs';
import { RegularText, TitleText, Button } from '../../../common';
import { masterCard } from '../../../../assets/images';
import { styles } from './styles';
import { drawerToggle } from '../../../navigation/navigationService';

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

export const InitialOrder = ({ paymentType, handleDispatch, openRBSheet }) => (
  <View style={styles.orderInfo}>
    <View style={styles.dash} />
    <View style={styles.order}>
      <View style={styles.rider}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Scooter />
          <View style={styles.riderInfo}>
            <TitleText title="Fleett Basic" style={styles.riderName} />
            <RegularText title="4-8 mins" style={styles.riderPlate} />
          </View>
        </View>
        <View style={styles.orderPrice}>
          <TitleText title="₦1,500" style={styles.orderAmount} />
          <RegularText
            title="Estimated cost"
            style={styles.orderDiscountAmount}
          />
          {/* <RegularText title="₦2,000" style={styles.orderDiscountAmount} /> */}
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.payMethod}
        onPress={openRBSheet}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {paymentType === 'card' ? (
            <>
              <Image
                source={masterCard}
                resizeMode="cover"
                style={styles.mastercard}
              />
              <RegularText
                title="Pay before delivery"
                style={styles.paymentText}
              />
            </>
          ) : (
            <>
              <Cash />
              <RegularText title="Pay with cash" style={styles.paymentText} />
            </>
          )}
        </View>
        <RightArrow />
      </TouchableOpacity>
      <Button
        title="Request Dispatch"
        style={styles.orderButton}
        onPress={handleDispatch}
      />
    </View>
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

export const RequestingView = ({ onCancel, title }) => (
  <View style={styles.orderInfo}>
    <View style={styles.dash} />
    <View style={styles.requesting}>
      <TitleText title={title} style={styles.requestingTitle} />
      <Button
        title="Cancel request"
        onPress={onCancel}
        style={styles.requestingBtn}
        textStyle={styles.requestingBtnText}
      />
    </View>
  </View>
);

export const NavButton = ({ isBack, onReset }) => {
  return isBack ? (
    <TouchableOpacity activeOpacity={0.8} style={styles.menu} onPress={onReset}>
      <BackArrow />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.menu}
      onPress={() => drawerToggle()}>
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

export const RiderPopView = ({ name, time, photo }) => (
  <View style={styles.popView}>
    <Image
      source={{ uri: photo ? photo : 'https://placeimg.com/640/640/people' }}
      resizeMode="cover"
      style={styles.popViewImage}
    />
    <RegularText
      title={`${name} arrives in ${time}`}
      style={styles.popViewText}
    />
  </View>
);

export const ErrorPopView = ({ title, label }) => (
  <View style={[styles.popView, styles.errorPopView]}>
    <TitleText title={title} style={styles.errorPopViewTitle} />
    <RegularText title={label} style={styles.errorPopViewText} />
  </View>
);
