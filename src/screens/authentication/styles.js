import { StyleSheet, Dimensions } from 'react-native';
import * as Colors from '../../common/Colors';
import { wp, hp } from '../../common/utils';

const { width } = Dimensions.get('screen');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: hp(20),
  },
  logo: {
    width: wp(112),
    height: hp(37),
    alignSelf: 'center',
  },
  texts: {
    marginTop: hp(55),
  },
  text: {
    marginTop: hp(9),
  },
  form: {
    marginTop: hp(79),
  },
  formInput: {
    marginBottom: hp(70),
  },
  forgotPass: {
    color: '#AEAEAE',
    marginTop: -20,
  },
  formButton: {
    width: '100%',
    marginTop: hp(74),
    marginBottom: hp(44),
  },
  registerTexts: {
    marginTop: hp(40),
  },
  registerInput: {
    marginBottom: hp(41),
  },
  registerform: {
    marginTop: hp(61),
  },
  errorView: {
    marginBottom: hp(30),
  },
  errorText: {
    color: 'red',
    fontSize: hp(14),
  },
});

export const registerStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: hp(20),
  },
  text: {
    marginTop: hp(9),
  },
  formButton: {
    width: '100%',
    marginTop: hp(50),
    marginBottom: hp(42),
  },
  texts: {
    marginTop: hp(40),
  },
  input: {
    marginBottom: hp(41),
  },
  form: {
    marginTop: hp(61),
  },
  errorView: {
    marginBottom: hp(30),
  },
  errorText: {
    color: 'red',
    fontSize: hp(14),
  },
});
