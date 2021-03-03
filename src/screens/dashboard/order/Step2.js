import React, { useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import { BackIcon, DeliverySwitch } from '../../../../assets/svgs';
import {
  TitleText,
  Woodsmoke,
  ScarpaFlow,
  Button,
  RegularText,
  BottomSheet,
} from '../../../common';
import { styles } from './styles';

const OrderTwo = () => {
  const orderBottomSheet = useRef();

  const OrderReview = () => (
    <View style={styles.order}>
      <RegularText
        title={moment().format('D MMMM  YYYY')}
        style={styles.orderTitle}
      />
      <View style={styles.doubleView}>
        <View style={styles.orderSection}>
          <TitleText title="Pick up" style={styles.doubleViewTitle} />
          <RegularText
            title="14 Kogberegbe street, Ikorodu, Lagos"
            style={styles.doubleViewText}
          />
        </View>
        <DeliverySwitch style={{ marginTop: 13 }} />
        <View style={styles.orderSection}>
          <TitleText title="Delivery" style={styles.doubleViewTitle} />
          <RegularText
            title="4 Adebayo cresent, Ijora, Lagos"
            style={styles.doubleViewText}
          />
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.doubleView}>
        <View style={styles.orderSection}>
          <TitleText title="Sending" style={styles.doubleViewTitle} />
          <RegularText title="Parcels  X 2" style={styles.doubleViewText} />
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.total}>
        <TitleText title="Total" style={styles.totalText} />
        <RegularText title="₦1,500" style={styles.totalAmount} />
      </View>
      <Button title="Continue With Payment" style={styles.orderBtn} />
    </View>
  );

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
              <TitleText title="Package Recipient" style={styles.headerTitle} />
            </View>
            <View style={styles.pagination}>
              <View style={styles.paginationDot} />
              <View style={[styles.paginationDot, styles.paginationActive]} />
              <View style={styles.paginationDot} />
            </View>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.content}>
            <TitleText
              title="Who are you delivering to?"
              style={styles.contentTitle}
            />
            <View style={styles.form}>
              <View style={styles.input}>
                <TitleText title="Receiver’s Name" style={styles.label} />
                <TextInput
                  placeholder="Full name"
                  placeholderTextColor={ScarpaFlow}
                  style={styles.textInput}
                />
              </View>
              <View style={styles.input}>
                <TitleText title="Receiver’s Phone" style={styles.label} />
                <TextInput
                  placeholder="Phone number"
                  placeholderTextColor={ScarpaFlow}
                  style={styles.textInput}
                />
              </View>
              <View style={styles.input}>
                <TitleText title="Notes" style={styles.label} />
                <TextInput
                  placeholder="Additional notes"
                  placeholderTextColor={ScarpaFlow}
                  textAlignVertical="top"
                  multiline
                  style={[styles.textInput, { height: 130, paddingTop: 10 }]}
                />
              </View>
              <Button
                title="Request Pickup"
                style={styles.button}
                onPress={() => orderBottomSheet.current.open()}
              />
            </View>
            <BottomSheet
              openRef={orderBottomSheet}
              height={520}
              render={<OrderReview />}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default OrderTwo;
