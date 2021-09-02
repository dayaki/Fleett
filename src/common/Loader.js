import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { loadingBar } from '../../assets/lotties';
import { wp } from './utils';

export const Loader = () => (
  <View style={styles.container}>
    <LottieView source={loadingBar} autoPlay loop style={styles.lottieView} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(40, 58, 92,0.3)',
    zIndex: 1000,
    paddingTop: '60%',
  },
  lottieView: {
    width: wp(254),
    alignSelf: 'center',
  },
});
