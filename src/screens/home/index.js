import React from 'react';
import {
  View,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import { ActiveBell, Search } from '../../../assets/svgs';
import { RegularText, TitleText } from '../../common';
import { styles } from './styles';

const Home = () => {
  return (
    <SafeAreaView style={styles.safeview}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.topHeader}>
            <TouchableOpacity>
              <Image
                source={{
                  uri:
                    'https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/user/12.jpg',
                }}
                style={styles.avatar}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <ActiveBell />
            </TouchableOpacity>
          </View>

          <View style={styles.headerTexts}>
            <Text style={styles.headerName}>Hi Dayo,</Text>
            <Text style={styles.headerText}>Track your Shipment</Text>
            <RegularText
              title="Please enter your tracking number"
              style={styles.headerPrint}
            />
          </View>

          <View style={styles.search}>
            <Search />
            <TextInput
              placeholderTextColor={'rgba(129,127,128,0.84)'}
              placeholder="Tracking number"
              style={styles.searchInput}
            />
          </View>
        </View>

        <View style={styles.content}>
          <RegularText title="Services" style={styles.title} />
          <View style={styles.item}>
            <TitleText title="Send a Package" style={styles.itemTitle} />
            <RegularText title="Send or receive items such as documents, parcels, keys, etc." />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
