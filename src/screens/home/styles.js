import { StyleSheet, Dimensions } from 'react-native';
import * as Colors from '../../common/Colors';
import { wp, hp } from '../../common/utils';

const { width } = Dimensions.get('screen');

export const styles = StyleSheet.create({
  safeview: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  header: {
    backgroundColor: Colors.Woodsmoke,
    paddingHorizontal: wp(22),
    paddingTop: hp(27),
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
  headerTexts: {
    marginTop: hp(45),
    alignSelf: 'center',
  },
  headerName: {
    color: Colors.White,
    fontFamily: 'TTNormsPro-Medium',
    fontSize: hp(24),
    lineHeight: hp(29),
    textAlign: 'center',
  },
  headerText: {
    color: Colors.White,
    fontFamily: 'TTNormsPro-Medium',
    fontSize: hp(24),
    lineHeight: hp(29),
    textAlign: 'center',
    marginTop: hp(3),
    marginBottom: hp(29),
  },
  headerPrint: {
    color: Colors.SuvaGray,
    fontSize: 14,
    lineHeight: 21,
  },
  search: {
    alignSelf: 'center',
    backgroundColor: Colors.White,
    width: wp(299),
    height: hp(48),
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(29),
    marginBottom: hp(100),
    paddingLeft: wp(12),
  },
  searchInput: {
    paddingLeft: wp(10),
  },
  content: {
    backgroundColor: Colors.White,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: wp(22),
    paddingTop: hp(56),
    marginTop: hp(-30),
  },
  title: {
    fontSize: hp(19),
    color: Colors.Black,
    lineHeight: hp(29),
    marginBottom: hp(39),
  },
  item: {
    backgroundColor: Colors.WildSand,
    borderRadius: 6,
    paddingHorizontal: wp(18),
    paddingVertical: hp(15),
    height: hp(109),
    marginBottom: hp(27),
  },
  itemTitle: {
    fontSize: hp(16),
    marginBottom: hp(10),
  },
  itemText: {
    color: Colors.ScarpaFlow,
    fontSize: hp(14),
    width: '60%',
    lineHeight: hp(16),
  },
  itemBtn: {
    backgroundColor: Colors.MountainMeadow,
    width: wp(26),
    height: hp(26),
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    bottom: 0,
  },
});
