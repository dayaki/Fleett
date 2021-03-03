import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { BackIcon, Plus, Minus } from '../../../../assets/svgs';
import {
  Input,
  RegularText,
  TitleText,
  Woodsmoke,
  ScarpaFlow,
  Button,
} from '../../../common';
import { styles } from './styles';

const Order = () => {
  return (
    <>
      <SafeAreaView style={{ backgroundColor: Woodsmoke }}></SafeAreaView>
      <SafeAreaView style={styles.safeview}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.topHeader}>
              <TouchableOpacity
                onPress={() => Actions.pop()}
                style={styles.headerBtn}>
                <BackIcon />
              </TouchableOpacity>
              <TitleText
                title="Package Destination"
                style={styles.headerTitle}
              />
            </View>
            <View style={styles.pagination}>
              <View style={[styles.paginationDot, styles.paginationActive]} />
              <View style={styles.paginationDot} />
              <View style={styles.paginationDot} />
            </View>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.content}>
            <TitleText
              title="Where are you delivering to?"
              style={styles.contentTitle}
            />
            <View style={styles.form}>
              <View style={styles.input}>
                <TitleText title="Pickup Address" style={styles.label} />
                <TextInput
                  placeholder="Address"
                  placeholderTextColor={ScarpaFlow}
                  style={styles.textInput}
                />
              </View>
              <View style={styles.input}>
                <TitleText title="Dropoff Address" style={styles.label} />
                <TextInput
                  placeholder="Address"
                  placeholderTextColor={ScarpaFlow}
                  style={styles.textInput}
                />
              </View>
              <View style={styles.input}>
                <TitleText title="Item name" style={styles.label} />
                <TextInput
                  placeholder="Name of item to be delivered"
                  placeholderTextColor={ScarpaFlow}
                  style={styles.textInput}
                />
              </View>
              <View style={styles.input}>
                <TitleText title="Enter Quantity" style={styles.label} />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TextInput
                    placeholder="Quantity of item"
                    placeholderTextColor={ScarpaFlow}
                    style={[styles.textInput, { width: '70%' }]}
                  />
                  <TouchableOpacity style={styles.inputBtn}>
                    <Minus />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.inputBtn}>
                    <Plus />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.input}>
                <TitleText title="Notes" style={styles.label} />
                <TextInput
                  placeholder="Additional notes"
                  placeholderTextColor={ScarpaFlow}
                  style={styles.textInput}
                />
              </View>
              <Button title="Continue" style={styles.button} />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Order;
