import React from 'react';
import { Actions } from 'react-native-router-flux';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { BackArrow } from '../../assets/svgs';
import { wp, hp } from './utils';
import { White, Black } from './Colors';
import { TitleText, RegularText } from './Text';

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

export const BackView = ({ children, isScroll, title }) => (
  <SafeAreaView style={styles.safeview}>
    <View style={styles.backView}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => Actions.pop()}
          style={styles.backBtn}>
          <BackArrow />
        </TouchableOpacity>
        <TitleText title={title} style={styles.headerTitle} />
      </View>
      {isScroll ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.backViewContent}>
          {children}
        </ScrollView>
      ) : (
        <View style={styles.backViewContent}>{children}</View>
      )}
    </View>
  </SafeAreaView>
);

export const BottomSheet = ({ openRef, height, render, lock }) => (
  <RBSheet
    ref={openRef}
    height={height}
    closeOnPressMask={lock ? false : true}
    closeOnPressBack={lock ? false : true}
    customStyles={{
      wrapper: {
        backgroundColor: 'rgba(20,20,20,0.87)',
      },
      container: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingHorizontal: 20,
        paddingTop: 20,
      },
      draggableIcon: {
        backgroundColor: '#fff',
      },
    }}>
    <View>{render}</View>
  </RBSheet>
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
    paddingTop: hp(30),
  },
  backViewContent: {
    // paddingTop: hp(50),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: hp(20),
  },
  backBtn: {
    paddingVertical: hp(10),
    position: 'absolute',
    left: 0,
  },
  headerTitle: {
    color: Black,
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
  bottomSheet: {
    backgroundColor: White,
  },
});
