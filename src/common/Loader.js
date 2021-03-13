import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { loading } from '../../assets/lotties';
import { hp, wp } from './utils';

export const Loader = ({}) => (
  <View style={styles.container}>
    <LottieView source={loading} autoPlay loop style={styles.lottieView} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: hp(0),
    left: wp(0),
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  lottieView: {
    width: wp(254),
    alignSelf: 'center',
  },
});
