import { StyleSheet, Dimensions } from 'react-native';
import * as Colors from '../../../common/Colors';
import { wp, hp } from '../../../common/utils';

const { width } = Dimensions.get('screen');

export const historyStyles = StyleSheet.create({
  safeview: {
    flex: 1,
    backgroundColor: Colors.Woodsmoke,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingTop: hp(50),
  },
  header: {
    backgroundColor: Colors.White,
    paddingHorizontal: wp(22),
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    width: wp(28),
    height: hp(28),
    borderRadius: 14,
  },
  headerTitle: {
    color: Colors.Woodsmoke,
    fontSize: hp(18),
    lineHeight: hp(29),
  },
  headerTexts: {
    marginTop: hp(45),
    alignSelf: 'center',
  },
  headerName: {
    color: Colors.Woodsmoke,
    fontFamily: 'TTNormsPro-Medium',
    fontSize: hp(24),
    lineHeight: hp(33),
    textAlign: 'center',
  },
  headerText: {
    color: Colors.Woodsmoke,
    fontFamily: 'TTNormsPro-Medium',
    fontSize: hp(24),
    lineHeight: hp(33),
    textAlign: 'center',
    marginTop: hp(3),
    marginBottom: hp(40),
  },
  content: {
    backgroundColor: Colors.Woodsmoke,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: wp(22),
    paddingTop: hp(56),
  },
});
