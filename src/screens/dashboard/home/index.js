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
import { Actions } from 'react-native-router-flux';
import { ActiveBell, Search, ForwardArrow } from '../../../../assets/svgs';
import { RegularText, TitleText, Woodsmoke } from '../../../common';
import { styles } from './styles';

const Home = () => {
  return (
    <>
      <SafeAreaView style={{ backgroundColor: Woodsmoke }}></SafeAreaView>
      <SafeAreaView style={styles.safeview}>
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

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.content}>
            <RegularText title="Services" style={styles.title} />
            <View style={styles.item}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => Actions.order()}>
                <TitleText title="Send a Package" style={styles.itemTitle} />
                <RegularText
                  title="Send or receive items such as documents, parcels, keys, etc."
                  style={styles.itemText}
                />
                <View style={styles.itemBtn}>
                  <ForwardArrow />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.item}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => Actions.order()}>
                <TitleText title="I am a Recipient" style={styles.itemTitle} />
                <RegularText
                  title="Schedule a pickup yourself, package will be delivered to you."
                  style={styles.itemText}
                />
                <View style={styles.itemBtn}>
                  <ForwardArrow />
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Home;
