import { Platform, Dimensions } from 'react-native';
import {
  widthPercentageToDP as wdp,
  heightPercentageToDP as hdp,
} from 'react-native-responsive-screen';

const CustomHeight = 896;
const CustomWidth = 414;

export const hp = (value) => {
  const dimension = (value / CustomHeight) * 100;
  return hdp(`${dimension}%`);
};

export const wp = (value) => {
  const dimension = (value / CustomWidth) * 100;
  return wdp(`${dimension}%`);
};

// //iPhoneX and StatusBar helpers
export function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 896 ||
      dimen.width === 896)
  );
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}

export function getStatusBarHeight(safe) {
  return Platform.select({
    ios: ifIphoneX(safe ? 44 : 30, 20),
    android: 10,
    default: 0,
  });
}

export const paddingTopiOS =
  (Platform.OS === 'ios' || Platform.OS === 'android') &&
  getStatusBarHeight(true);

export const BottomSpace = isIphoneX() ? hp(30) : 0;
