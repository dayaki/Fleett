import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { wp, hp } from './utils';

export const NormalView = ({ children }) => (
  <SafeAreaView style={styles.safeview}>
    <View style={styles.normalView}>{children}</View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safeview: {
    flex: 1,
  },
  normalView: {
    flex: 1,
    paddingTop: hp(20),
    paddingHorizontal: wp(30),
  },
});
