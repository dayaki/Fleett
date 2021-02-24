import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import { hp, wp } from './utils';
import * as Colors from './Colors';

export const Button = ({ title, onPress, style, isLoading }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}
      activeOpacity={0.8}>
      {isLoading ? (
        <ActivityIndicator size="small" color={Colors.White} />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.Black,
    borderRadius: 5,
    width: wp(280),
    height: hp(60),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: Colors.White,
    fontFamily: 'TTNormsPro-Bold',
    fontSize: hp(18),
  },
});
