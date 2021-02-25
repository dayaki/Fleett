import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import * as Colors from './Colors';
import { hp, wp } from './utils';

export const HeaderText = ({ style, title, onPress }) => (
  <Text style={[styles.headerTextStyle, style]} onPress={onPress}>
    {title}
  </Text>
);

export const TitleText = ({ style, title, onPress }) => (
  <Text style={[styles.titleStyle, style]} onPress={onPress}>
    {title}
  </Text>
);

export const DoubleText = ({ title, style, onPress, text }) => (
  <View style={[styles.double, style]}>
    <Text style={styles.doubleText}>{title}</Text>
    <Text style={styles.doubleButton} onPress={onPress}>
      {text}
    </Text>
  </View>
);

export const RegularText = ({ onPress, style, title }) => (
  <Text style={[styles.regularStyle, style]} onPress={onPress}>
    {title}
  </Text>
);

const styles = StyleSheet.create({
  headerTextStyle: {
    fontFamily: 'TTNormsPro-Bold',
    fontSize: hp(30),
    lineHeight: hp(37),
  },
  titleStyle: {
    fontFamily: 'TTNormsPro-Bold',
    fontSize: hp(18),
    lineHeight: hp(23),
    color: Colors.Black,
  },
  regularStyle: {
    fontFamily: 'TTNormsPro-Medium',
    fontSize: hp(16),
    lineHeight: hp(21),
    color: Colors.SilverChalice,
  },
  double: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  doubleText: {
    fontFamily: 'TTNormsPro-Bold',
    fontSize: hp(15),
    color: Colors.ScarpaFlow,
    opacity: 0.75,
  },
  doubleButton: {
    color: Colors.Black,
    fontFamily: 'TTNormsPro-Bold',
    fontSize: hp(16),
    lineHeight: hp(37),
    paddingLeft: wp(10),
  },
});
