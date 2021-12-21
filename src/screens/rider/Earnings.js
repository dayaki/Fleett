import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RegularText, NoContentView } from '../../common';
import { RiderMenu } from '../../../assets/svgs';
import { historyStyles as styles } from './styles';
import { drawerToggle } from '../../navigation/navigationService';
import apiService from '../../utils/apiService';

// const HistoryItem = () => (
//   <View style={styles.historyItem}>
//     <BoxIcon />
//     <View style={styles.historyItemTexts}>
//       <RegularText title="Mary Akinlapa" style={styles.itemName} />
//       <RegularText title="In Progress" style={styles.itemStatus} />
//     </View>
//     <RegularText title="10-01-2021" style={styles.itemDate} />
//   </View>
// );

const Earnings = () => {
  const { fname, _id } = useSelector((state) => state.rider.profile);
  const [earnings, setEarnings] = useState(null);

  useEffect(() => {
    apiService(`rider/earnings/${_id}`, 'GET').then(({ data }) => {
      console.log('rs', data);
      setEarnings(data);
    });
  }, []);

  return (
    <SafeAreaView style={styles.safeview}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.topHeader}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => drawerToggle()}
              style={styles.avatarBtn}>
              <RiderMenu />
            </TouchableOpacity>
            <RegularText title="Your Earnings" style={styles.headerTitle} />
          </View>

          <View style={styles.headerTexts}>
            <Text style={styles.headerName}>Hi {fname},</Text>
            <Text style={styles.headerText}>See your total earnings</Text>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
          {!earnings ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <NoContentView title="No earnings yet." />
          )}

          {/* <HistoryItem />
        <HistoryItem /> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Earnings;
