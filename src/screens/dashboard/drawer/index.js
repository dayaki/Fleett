import React from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { useSelector, useDispatch } from 'react-redux';
import { TitleText, RegularText } from '../../../common';
import {
  MenuHelp,
  MenuHistory,
  MenuLock,
  MenuTracking,
  MenuNewOrder,
} from '../../../../assets/svgs';
import { styles } from './styles';
import { userLogout } from '../../../store/actions/userActions';

const DrawerMenu = () => {
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
              uri: photo
                ? photo
                : 'https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/user/12.jpg',
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
            onPress={() => Actions.drawer()}>
            <View style={styles.navIcon}>
              <MenuTracking />
            </View>
            <RegularText title="Tracking" style={styles.navItemText} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.navItem}
            onPress={() => Actions.order()}>
            <View style={styles.navIcon}>
              <MenuTracking />
            </View>
            <RegularText title="New Order" style={styles.navItemText} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.navItem}
            onPress={() => Actions.history()}>
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
            onPress={() => Actions.about()}>
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
