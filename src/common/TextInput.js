import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import * as Colors from './Colors';
import { hp, wp } from './utils';

export const Input = ({
  placeholder,
  icon,
  value,
  onChange,
  onBlur,
  error = false,
  capitalize = 'words',
  secure,
  keyboardType,
  disable,
}) => (
  <View style={styles.input}>
    <View style={styles.icon}>{icon}</View>
    <TextInput
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      placeholderTextColor={Colors.SilverGray}
      style={styles.textInput}
      autoCapitalize={capitalize}
      secureTextEntry={secure}
      keyboardType={keyboardType || 'default'}
      editable={!disable}
    />
    {error && <Text style={styles.error}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderBottomColor: 'rgba(177, 169, 169, 0.28)',
    borderBottomWidth: hp(1),
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: hp(3),
    // paddingBottom: hp(7),
  },
  icon: {
    marginTop: hp(5),
  },
  textInput: {
    fontFamily: 'TTNormsPro-Regular',
    fontSize: hp(16),
    lineHeight: hp(21),
    color: Colors.SilverChalice,
    paddingLeft: wp(8),
    // backgroundColor: 'pink',
    width: '100%',
  },
  error: {
    fontFamily: 'TTNormsPro-Regular',
    fontSize: hp(14),
    lineHeight: hp(21),
    color: 'red',
    position: 'absolute',
    bottom: -20,
  },
});
