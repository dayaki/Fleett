import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { RegularText, TitleText } from '../../../common';
import { ActiveBellBlack } from '../../../../assets/svgs';
import { historyStyles as styles } from './styles';

const History = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topHeader}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => Actions.drawerOpen()}>
            <Image
              source={{
                uri:
                  'https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/user/12.jpg',
              }}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <RegularText title="History" style={styles.headerTitle} />
          <TouchableOpacity>
            <ActiveBellBlack />
          </TouchableOpacity>
        </View>

        <View style={styles.headerTexts}>
          <Text style={styles.headerName}>Hi Dayo,</Text>
          <Text style={styles.headerText}>See your order history</Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.content}></ScrollView>
    </View>
  );
};

export default History;
