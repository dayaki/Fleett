import React from 'react';
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useSelector, useDispatch } from 'react-redux';
import { TitleText, RegularText } from '../../common';
import {
  MenuHelp,
  MenuHistory,
  MenuLock,
  MenuTracking,
  MenuNewOrder,
} from '../../../assets/svgs';
import { sideMenuStyles as styles } from './styles';
import { logout } from '../../store/actions/riderActions';

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
            source={{
              uri: profile.photo
                ? profile.photo
                : 'https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/user/12.jpg',
            }}
            style={styles.profileImage}
          />
          <TitleText
            title={`${profile.fname} ${profile.lname}`}
            style={styles.profileText}
          />
          {/* <TitleText title={profile.lname} style={styles.profileText} /> */}
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.navList}>
          <TouchableOpacity activeOpacity={0.8} style={styles.navItem}>
            <View style={styles.navIcon}>
              <MenuTracking />
            </View>
            <RegularText title="Dashboard" style={styles.navItemText} />
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
