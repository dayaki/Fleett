import React from 'react';
import { SafeAreaView, View } from 'react-native';
import LottieView from 'lottie-react-native';
// import { Button, TitleText, RegularText } from '../../common';
import { findingRider } from '../../../assets/lotties';
import { riderStyles as styles } from './styles';

const FindRider = () => {
  return (
    <SafeAreaView style={styles.safeview}>
      <View style={styles.container}>
        <LottieView
          source={findingRider}
          autoPlay
          loop
          style={styles.lottieView}
        />
      </View>
    </SafeAreaView>
  );
};
export default FindRider;
