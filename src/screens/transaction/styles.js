import { StyleSheet } from 'react-native';
import * as Colors from '../../common/Colors';
import { hp } from '../../common';

export const styles = StyleSheet.create({
  safeview: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  container: {
    flex: 1,
    // backgroundColor: 'pink',
    // justifyContent: 'flex-start',
  },
  lottieView: {
    // backgroundColor: 'red',
    height: hp(300),
    alignSelf: 'center',
    width: '100%',
  },
});

export const riderStyles = StyleSheet.create({
  safeview: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  container: {
    flex: 1,
    // backgroundColor: 'pink',
    // justifyContent: 'flex-start',
  },
  lottieView: {
    // backgroundColor: 'red',
    height: hp(250),
    alignSelf: 'center',
  },
});
