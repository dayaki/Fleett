import { StyleSheet, Dimensions } from 'react-native';
import * as Colors from '../../common';
import { wp, hp } from '../../common/utils';

const { width } = Dimensions.get('screen');

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(80),
    paddingHorizontal: wp(30),
  },
  logo: {
    width: wp(112),
    height: hp(37),
    alignSelf: 'center',
  },
  title: {
    fontSize: hp(40),
    lineHeight: hp(40),
    marginTop: hp(67),
    marginBottom: hp(54),
    width: '60%',
  },
  introText: {
    color: Colors.SilverChalice,
    fontSize: hp(15),
    lineHeight: hp(18),
    width: '50%',
  },
  form: {
    marginTop: hp(85),
  },
  input: {
    marginBottom: hp(45),
  },
  textInput: {
    backgroundColor: Colors.WildSand,
    height: hp(50),
    borderRadius: 6,
    paddingVertical: hp(6),
    paddingLeft: wp(20),
    fontSize: hp(12),
    color: Colors.ScarpaFlow,
  },
  button: {
    marginTop: hp(55),
  },
  errorView: {
    marginBottom: hp(10),
  },
  errorText: {
    color: 'red',
    fontSize: hp(14),
  },
});

export const dashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  onlineStatus: {
    backgroundColor: Colors.White,
    position: 'absolute',
    bottom: hp(0),
    paddingHorizontal: wp(28),
    paddingVertical: hp(19),
    borderTopRightRadius: wp(20),
    borderTopLeftRadius: wp(20),
    width: '100%',
    // height: hp(117),
    alignSelf: 'center',
  },
  dash: {
    backgroundColor: Colors.SilverGray,
    width: wp(100),
    height: hp(4),
    alignSelf: 'center',
  },
  onlineState: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineTexts: {
    marginLeft: wp(20),
  },
  onlineViews: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: hp(34),
  },
  onlineStatusTitle: {
    fontSize: hp(16),
  },
  onlineStatusSub: {
    fontSize: hp(13),
    marginTop: -3,
  },
  actionButton: {
    backgroundColor: Colors.Black,
    paddingHorizontal: wp(20),
    paddingVertical: hp(8),
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton2: {
    backgroundColor: Colors.MountainMeadow,
    width: wp(60),
    height: hp(60),
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    color: Colors.White,
  },
});
