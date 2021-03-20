import { StyleSheet, Dimensions } from 'react-native';
import * as Colors from '../../common/Colors';
import { wp, hp } from '../../common/utils';

const { width } = Dimensions.get('screen');

export const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: hp(20),
  },
  logo: {
    width: wp(112),
    height: hp(37),
  },
  texts: {
    marginTop: hp(100),
    width: width,
    flex: 1,
    paddingHorizontal: wp(50),
    justifyContent: 'flex-end',
    marginBottom: hp(50),
  },
  pagination: {
    position: 'absolute',
    bottom: hp(350),
  },
  paginations: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(33),
  },
  paginationDot: {
    width: wp(10),
    height: hp(10),
    borderRadius: 5,
    backgroundColor: Colors.Silver,
    marginRight: wp(6),
  },
  current: {
    width: wp(47),
  },
  sliderHeader: {
    textAlign: 'center',
  },
  sliderText: {
    color: Colors.SuvaGray,
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: hp(22),
    fontFamily: 'TTNormsPro-Medium',
    fontSize: hp(15),
    marginTop: hp(28),
  },
  sliderFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(25),
    alignSelf: 'center',
  },
  sliderFooterText: {
    fontFamily: 'TTNormsPro-Bold',
    fontSize: hp(15),
    color: Colors.ScarpaFlow,
    opacity: 0.75,
  },
  sliderFooterButton: {
    color: Colors.Black,
    fontFamily: 'TTNormsPro-Bold',
    fontSize: hp(16),
    lineHeight: hp(37),
    paddingLeft: wp(20),
  },
});
