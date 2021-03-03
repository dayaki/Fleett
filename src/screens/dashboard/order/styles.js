import { StyleSheet, Dimensions } from 'react-native';
import * as Colors from '../../../common/Colors';
import { wp, hp } from '../../../common/utils';

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
    paddingTop: hp(10),
    height: hp(156),
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBtn: {
    position: 'absolute',
    left: 0,
  },
  headerTitle: {
    color: Colors.White,
    fontSize: hp(18),
    lineHeight: hp(21),
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp(35),
  },
  paginationDot: {
    width: wp(6),
    height: hp(6),
    borderRadius: 3,
    backgroundColor: Colors.White,
    marginLeft: wp(5),
  },
  paginationActive: {
    width: wp(15),
    height: hp(15),
    borderRadius: 10,
    backgroundColor: 'transparent',
    borderColor: Colors.White,
    borderWidth: 1,
  },
  content: {
    backgroundColor: Colors.White,
    borderTopLeftRadius: wp(30),
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingTop: hp(50),
    paddingHorizontal: wp(25),
  },
  contentTitle: {
    alignSelf: 'center',
    fontSize: hp(20),
    marginBottom: hp(30),
  },
  form: {
    marginTop: hp(30),
  },
  input: {
    marginBottom: hp(25),
  },
  label: {
    fontSize: hp(14),
  },
  textInput: {
    backgroundColor: Colors.WildSand,
    height: hp(41),
    borderRadius: 6,
    paddingVertical: hp(6),
    paddingLeft: wp(20),
    marginTop: hp(9),
    fontSize: hp(12),
    color: Colors.ScarpaFlow,
  },
  inputBtn: {
    backgroundColor: Colors.WildSand,
    width: wp(42),
    height: hp(41),
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(10),
    marginTop: hp(5),
  },
  button: {
    marginTop: hp(30),
  },
  order: {
    // paddingTop: hp(50),
    backgroundColor: Colors.White,
  },
  orderTitle: {
    fontSize: hp(16),
    color: Colors.Woodsmoke,
  },
  doubleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(23),
  },
  orderSection: {
    width: '40%',
  },
  doubleViewTitle: {
    color: Colors.SilverGray,
    fontSize: hp(12),
    lineHeight: hp(37),
  },
  doubleViewText: {
    fontSize: hp(14),
    lineHeight: hp(20),
    color: Colors.Woodsmoke,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#E4E4E4',
    marginTop: hp(20),
  },
  total: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(28),
  },
  totalText: {
    color: Colors.Woodsmoke,
    fontSize: hp(16),
    lineHeight: hp(20),
  },
  totalAmount: {
    color: Colors.Woodsmoke,
    fontSize: hp(26),
    lineHeight: hp(50),
  },
  orderBtn: {
    marginTop: hp(40),
  },
});

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
    paddingHorizontal: wp(39),
    paddingTop: hp(56),
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(30),
  },
  historyItemTexts: {
    marginLeft: wp(25),
  },
  itemName: {
    fontSize: hp(17),
    lineHeight: hp(29),
    color: Colors.White,
  },
  itemStatus: {
    fontSize: hp(13),
    lineHeight: hp(29),
    color: Colors.White,
    opacity: 0.4,
    marginTop: -6,
  },
  itemDate: {
    position: 'absolute',
    right: 0,
  },
});
