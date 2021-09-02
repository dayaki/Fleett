import React from 'react';
import { SafeAreaView, View } from 'react-native';
import LottieView from 'lottie-react-native';
// import { Button, TitleText, RegularText } from '../../common';
import { success } from '../../../assets/lotties';
import { styles } from './styles';

const TransactionStatus = () => {
  return (
    <SafeAreaView style={styles.safeview}>
      <View style={styles.container}>
        <LottieView source={success} autoPlay loop style={styles.lottieView} />
      </View>
    </SafeAreaView>
  );
};
export default TransactionStatus;
