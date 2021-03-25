import { StyleSheet } from 'react-native';
import * as Colors from '../../../common/Colors';
import { wp, hp } from '../../../common/utils';

export const styles = StyleSheet.create({
  safeview: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  menu: {
    backgroundColor: Colors.White,
    width: wp(50),
    height: hp(50),
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  search: {
    backgroundColor: Colors.White,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(15),
    paddingVertical: hp(13),
    width: '90%',
    alignSelf: 'center',
    marginTop: hp(50),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  searchIcon: {
    borderRightColor: Colors.SilverChalice,
    borderRightWidth: 1,
    paddingRight: wp(15),
    paddingLeft: wp(10),
  },
  searchText: {
    color: Colors.Woodsmoke,
    fontFamily: 'TTNormsPro-Medium',
    fontSize: hp(18),
    marginLeft: wp(10),
  },
  content: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: hp(230),
    backgroundColor: Colors.White,
    paddingHorizontal: wp(20),
    paddingTop: hp(30),
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  contentText: {
    fontSize: hp(13),
    color: Colors.SilverChalice,
  },
  contentTitle: {
    fontSize: hp(17),
    color: Colors.Woodsmoke,
  },
  contentSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.White,
    height: hp(52),
    paddingLeft: wp(20),
    marginTop: hp(20),
    borderColor: 'rgba(0,0,0,0.15)',
    borderWidth: 1,
    borderRadius: 6,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.12,
    // shadowRadius: 3.84,
  },
  contentSearchText: {
    marginLeft: wp(10),
  },
  modal: {
    // top: 0,
    // left: 0,
    // right: 0,
    // padding: 0,
    // margin: 0,
    // marginHorizontal: 0,
    // justifyContent: 'flex-end',
    margin: 0,
  },
});

export const modalStyles = StyleSheet.create({
  safeview: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  header: {
    paddingHorizontal: wp(20),
    backgroundColor: Colors.White,
    paddingBottom: hp(10),
    shadowColor: 'rgba(0,0,0,0.8)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 0.84,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navbarBtn: {
    padding: 20,
    position: 'absolute',
    left: -20,
  },
  navbarTitle: {},
  addressInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    marginTop: hp(30),
  },
  addressIcon: {
    backgroundColor: 'red',
    width: wp(40),
    height: hp(80),
  },
  inputs: {
    marginHorizontal: wp(10),
    flex: 1,
  },
  addressInput: {
    height: wp(50),
    backgroundColor: 'rgba(244, 243, 245, 1)',
    borderRadius: 6,
    marginBottom: hp(10),
    paddingLeft: wp(15),
    width: '85%',
    fontSize: hp(17),
  },
  addAddress: {
    padding: 15,
    position: 'absolute',
    right: -5,
    bottom: 10,
  },
  searchAddresses: {
    // marginTop: hp(20),
    marginHorizontal: wp(20),
  },
  addressView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'rgba(233,233,233,1)',
    borderBottomWidth: 1,
    paddingVertical: hp(5),
    paddingHorizontal: wp(2),
    marginTop: hp(20),
  },
  addressViewIcon: {
    marginRight: wp(20),
    marginTop: -12,
  },
  addressViewInfo: {},
  addressStreet: {
    color: 'rgba(52,52,65,1)',
    fontSize: hp(18),
  },
  addressState: {
    color: 'rgba(128,131,142,0.8)',
    fontSize: hp(14),
  },
});
