import React from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { TitleText, RegularText } from '../../../common';
import {
  MenuHelp,
  MenuHistory,
  MenuLock,
  MenuTracking,
} from '../../../../assets/svgs';
import { styles } from './styles';
import { userLogout } from '../../../store/actions/userActions';

const DrawerMenu = ({ navigation }) => {
  const {
    profile: { fname, lname, photo },
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userLogout());
  };

  return (
    <SafeAreaView style={styles.safeview}>
      <View style={styles.container}>
        <View style={styles.profile}>
          <Image
            source={{
              uri:
                photo ||
                'https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/user/12.jpg',
            }}
            style={styles.profileImage}
          />
          <TitleText title={fname} style={styles.profileText} />
          <TitleText title={lname} style={styles.profileText} />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.navList}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.navItem}
            onPress={() => navigation.navigate('user_home')}>
            <View style={styles.navIcon}>
              <MenuTracking />
            </View>
            <RegularText title="Home" style={styles.navItemText} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.navItem}
            onPress={() => navigation.navigate('user_history')}>
            <View style={styles.navIcon}>
              <MenuHistory />
            </View>
            <RegularText title="History" style={styles.navItemText} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.navItem}>
            <View style={styles.navIcon}>
              <MenuHelp />
            </View>
            <RegularText title="Help & Support" style={styles.navItemText} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.navItem}
            onPress={() => navigation.navigate('user_about')}>
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
    </SafeAreaView>
  );
};

export default DrawerMenu;
