import React from 'react';
import { Actions } from 'react-native-router-flux';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { BackArrow } from '../../assets/svgs';
import { wp, hp } from './utils';
import { RegularText, White } from './index';

export const NormalView = ({ children }) => (
  <SafeAreaView style={styles.safeview}>
    <View style={styles.normalView}>{children}</View>
  </SafeAreaView>
);

export const NoContentView = ({ title }) => (
  <View style={styles.noContent}>
    <RegularText title={title} style={styles.noContentText} />
  </View>
);

export const BackView = ({ children, isScroll }) => (
  <SafeAreaView style={styles.safeview}>
    <View style={styles.backView}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => Actions.pop()}
          style={styles.backBtn}>
          <BackArrow />
        </TouchableOpacity>
      </View>
      {isScroll ? (
        <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
      ) : (
        <View>{children}</View>
      )}
    </View>
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
  backView: {
    flex: 1,
    paddingHorizontal: wp(30),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: hp(90),
  },
  backBtn: {
    paddingHorizontal: wp(20),
    paddingVertical: hp(10),
    backgroundColor: 'pink',
  },
  noContent: {
    alignSelf: 'center',
    marginTop: hp(60),
  },
  noContentText: {
    fontSize: hp(17),
    lineHeight: hp(29),
    color: White,
  },
});
