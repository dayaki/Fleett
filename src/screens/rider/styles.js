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
    marginTop: hp(50),
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
    elevation: 6,
  },
  userData: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: wp(20),
  },
  amount: {
    backgroundColor: Colors.Woodsmoke,
    borderRadius: 13,
    paddingVertical: hp(10),
    paddingHorizontal: wp(20),
  },
  amountText: {
    color: Colors.White,
    fontSize: hp(18),
  },
  avatar: {
    width: wp(64),
    height: hp(64),
    borderRadius: 32,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: wp(44),
    height: hp(44),
    borderRadius: 22,
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
  requestModal: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(22,21,21,0.76)',
  },
  newRequest: {
    paddingTop: hp(30),
  },
  newRequestTitle: {
    textAlign: 'center',
  },
  newRequestUser: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(44),
    marginBottom: hp(19),
  },
  newRequestName: {
    fontSize: hp(18),
    color: Colors.Woodsmoke,
    marginBottom: hp(5),
  },
  newRequestFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopColor: '#E4E4E4',
    borderTopWidth: 1,
    paddingVertical: hp(18),
  },
  newRequestAddress: {
    color: Colors.Silver,
    fontSize: hp(15),
  },
  newRequestNotes: {
    fontSize: hp(12),
    color: '#AAD3BA',
    marginTop: hp(4),
  },
  newRequestPhone: {
    paddingRight: wp(20),
  },
  dismissText: {},
  acceptBtn: {
    backgroundColor: Colors.Black,
    borderRadius: 4,
    paddingHorizontal: wp(21),
    paddingVertical: wp(13),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  acceptBtnText: {
    color: Colors.White,
    marginRight: wp(18),
  },
});

export const sideMenuStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Woodsmoke,
    paddingTop: hp(50),
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
  profileRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(10),
  },
  profileRatingText: {
    color: Colors.White,
    fontSize: hp(18),
    lineHeight: hp(27),
    marginLeft: wp(6),
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

export const historyStyles = StyleSheet.create({
  safeview: {
    flex: 1,
    backgroundColor: Colors.Woodsmoke,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingTop: hp(20),
  },
  header: {
    backgroundColor: Colors.White,
    paddingHorizontal: wp(22),
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarBtn: {
    position: 'absolute',
    left: 5,
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
    color: Colors.ScarpaFlow,
    fontFamily: 'TTNormsPro-Medium',
    fontSize: hp(18),
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
