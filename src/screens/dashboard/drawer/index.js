import React from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { TitleText, RegularText } from '../../../common';
import {
  MenuHelp,
  MenuHistory,
  MenuLock,
  MenuTracking,
} from '../../../../assets/svgs';
import { styles } from './styles';

const DrawerMenu = () => {
  return (
    <SafeAreaView style={styles.safeview}>
      <View style={styles.container}>
        <View style={styles.profile}>
          <Image
            source={{
              uri:
                'https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/user/12.jpg',
            }}
            style={styles.profileImage}
          />
          <TitleText title="Dayo" style={styles.profileText} />
          <TitleText title="Aderibegbe" style={styles.profileText} />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.navList}>
          <TouchableOpacity activeOpacity={0.8} style={styles.navItem}>
            <View style={styles.navIcon}>
              <MenuTracking />
            </View>
            <RegularText title="Tracking" style={styles.navItemText} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.navItem}>
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
            <RegularText title="Logout" style={styles.navItemText} />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DrawerMenu;
