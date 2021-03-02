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
import { RegularText, NoContentView } from '../../../common';
import { ActiveBellBlack, BoxIcon } from '../../../../assets/svgs';
import { historyStyles as styles } from './styles';

const HistoryItem = () => (
  <View style={styles.historyItem}>
    <BoxIcon />
    <View style={styles.historyItemTexts}>
      <RegularText title="Mary Akinlapa" style={styles.itemName} />
      <RegularText title="In Progress" style={styles.itemStatus} />
    </View>
    <RegularText title="10-01-2021" style={styles.itemDate} />
  </View>
);

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
      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <NoContentView title="No order history here yet" />
        {/* <HistoryItem />
        <HistoryItem /> */}
      </ScrollView>
    </View>
  );
};

export default History;
