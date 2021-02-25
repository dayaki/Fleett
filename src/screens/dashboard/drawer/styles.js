import { StyleSheet, Dimensions } from 'react-native';
import * as Colors from '../../../common/Colors';
import { wp, hp } from '../../../common/utils';

const { width } = Dimensions.get('screen');

export const styles = StyleSheet.create({
  safeview: {
    flex: 1,
    backgroundColor: Colors.Woodsmoke,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.Woodsmoke,
    paddingTop: hp(79),
    paddingLeft: wp(30),
  },
  profile: {},
  profileImage: {
    width: wp(44),
    height: hp(44),
    borderRadius: 22,
    marginBottom: hp(21),
  },
  profileText: {
    color: Colors.White,
    fontSize: hp(25),
    lineHeight: hp(27),
  },
  navList: {
    marginTop: hp(70),
    // paddingTop: hp(50),
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(35),
  },
  navItemText: {
    color: Colors.White,
    fontSize: hp(18),
    lineHeight: hp(34),
    paddingLeft: wp(15),
  },
});
