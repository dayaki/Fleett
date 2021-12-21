import React from 'react';
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useSelector, useDispatch } from 'react-redux';
import { TitleText, RegularText } from '../../common';
import {
  MenuHelp,
  MenuLock,
  MenuTracking,
  MenuEarnings,
  Star,
} from '../../../assets/svgs';
import { imagePlaceholder } from '../../../assets/images';
import { sideMenuStyles as styles } from './styles';
import { logout } from '../../store/actions/riderActions';
import { navigate } from '../../navigation/navigationService';

const SideMenu = (props) => {
  const { profile } = useSelector((state) => state.rider);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <View style={styles.profile}>
          <Image
            source={
              profile.photo
                ? {
                    uri: profile.photo,
                  }
                : imagePlaceholder
            }
            style={styles.profileImage}
          />
          <TitleText
            title={`${profile.fname} ${profile.lname}`}
            style={styles.profileText}
          />
          <View style={styles.profileRating}>
            <Star color="#fff" width={18} />
            <TitleText
              title={profile.rating}
              style={styles.profileRatingText}
            />
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.navList}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.navItem}
            onPress={() => navigate('rider_dashboard')}>
            <View style={styles.navIcon}>
              <MenuTracking />
            </View>
            <RegularText title="Dashboard" style={styles.navItemText} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.navItem}
            onPress={() => navigate('rider_earnings')}>
            <View style={styles.navIcon}>
              <MenuEarnings />
            </View>
            <RegularText title="Earnings" style={styles.navItemText} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.navItem}>
            <View style={styles.navIcon}>
              <MenuHelp />
            </View>
            <RegularText title="Help & Support" style={styles.navItemText} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.navItem}>
            <View style={styles.navIcon}>
              <MenuHelp />
            </View>
            <RegularText title="About" style={styles.navItemText} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.navItem}>
            <View style={styles.navIcon}>
              <MenuLock />
            </View>
            <RegularText
              title="Logout"
              style={styles.navItemText}
              onPress={handleLogout}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </DrawerContentScrollView>
  );
};

export default SideMenu;
