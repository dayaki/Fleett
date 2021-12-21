import React, { useRef, useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
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
import { PREPARE_ORDER } from '../../../store/actions/types';
import { initiateOrder } from '../../../store/actions/userActions';

const FormSchema = Yup.object().shape({
  recipient_name: Yup.string().required('Name of recipient is required.'),
  recipient_phone: Yup.string()
    .min(11, ({ min }) => `Phone number must be ${min} numbers`)
    .required('Phone number of recipient is needed'),
});

const OrderTwo = () => {
  const { profile, tempOrder, loading, closeBottomSheet } = useSelector(
    (state) => state.user,
  );
  const [bottomLock, setBottomLock] = useState(false);
  const dispatch = useDispatch();
  const orderBottomSheet = useRef();

  const prepareOrder = (data) => {
    const payload = data;
    payload.amount = 1500;
    dispatch({ type: PREPARE_ORDER, payload });
    orderBottomSheet.current.open();
  };

  const processOrder = () => {
    const payload = {
      name: `${profile.fname} ${profile.lname}`,
      phone: profile.phone,
      email: profile.email,
      amount: tempOrder.amount,
      user_id: profile.id,
    };
    dispatch(initiateOrder(payload));
  };

  useEffect(() => {
    if (closeBottomSheet) {
      orderBottomSheet.current.close();
    }
  }, [closeBottomSheet]);

  useEffect(() => {
    setBottomLock(loading);
  }, [loading]);

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
            title={tempOrder?.pickup_address}
            style={styles.doubleViewText}
          />
        </View>
        <DeliverySwitch style={{ marginTop: 13 }} />
        <View style={styles.orderSection}>
          <TitleText title="Delivery" style={styles.doubleViewTitle} />
          <RegularText
            title={tempOrder?.dropoff_address}
            style={styles.doubleViewText}
          />
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.doubleView}>
        <View style={styles.orderSection}>
          <TitleText title="Sending" style={styles.doubleViewTitle} />
          <RegularText
            title={`${tempOrder?.item_name} X ${tempOrder?.quantity}`}
            style={styles.doubleViewText}
          />
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.total}>
        <TitleText title="Total" style={styles.totalText} />
        <RegularText title="₦1,500" style={styles.totalAmount} />
      </View>
      <Button
        title="Continue With Payment"
        style={styles.orderBtn}
        onPress={processOrder}
        isLoading={loading}
      />
    </View>
  );

  return (
    <>
      <SafeAreaView style={{ backgroundColor: Woodsmoke }}></SafeAreaView>
      <SafeAreaView style={styles.safeview}>
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.topHeader}>
                <TouchableOpacity
                  onPress={() => Actions.pop()}
                  style={styles.headerBtn}>
                  <BackIcon />
                </TouchableOpacity>
                <TitleText
                  title="Package Recipient"
                  style={styles.headerTitle}
                />
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
              <Formik
                validationSchema={FormSchema}
                initialValues={{
                  recipient_name: '',
                  recipient_phone: '',
                  note: '',
                }}
                onSubmit={(values) => prepareOrder(values)}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <View style={styles.form}>
                    <View style={styles.input}>
                      <TitleText title="Receiver’s Name" style={styles.label} />
                      <TextInput
                        placeholder="Full name"
                        placeholderTextColor={ScarpaFlow}
                        style={styles.textInput}
                        value={values.recipient_name}
                        onChangeText={handleChange('recipient_name')}
                        onBlur={handleBlur('recipient_name')}
                      />
                      {errors.recipient_name && touched.recipient_name ? (
                        <Text style={{ fontSize: 10, color: 'red' }}>
                          {errors.recipient_name}
                        </Text>
                      ) : null}
                    </View>
                    <View style={styles.input}>
                      <TitleText
                        title="Receiver’s Phone"
                        style={styles.label}
                      />
                      <TextInput
                        placeholder="Phone number"
                        placeholderTextColor={ScarpaFlow}
                        style={styles.textInput}
                        value={values.recipient_phone}
                        maxLength={11}
                        keyboardType="number-pad"
                        onChangeText={handleChange('recipient_phone')}
                        onBlur={handleBlur('recipient_phone')}
                      />
                      {errors.recipient_phone && touched.recipient_phone ? (
                        <Text style={{ fontSize: 10, color: 'red' }}>
                          {errors.recipient_phone}
                        </Text>
                      ) : null}
                    </View>
                    <View style={styles.input}>
                      <TitleText title="Notes" style={styles.label} />
                      <TextInput
                        placeholder="Additional notes"
                        placeholderTextColor={ScarpaFlow}
                        textAlignVertical="top"
                        multiline
                        value={values.note}
                        onChangeText={handleChange('note')}
                        onBlur={handleBlur('note')}
                        style={[
                          styles.textInput,
                          { height: 130, paddingTop: 10 },
                        ]}
                      />
                    </View>
                    <Button
                      title="Request Pickup"
                      style={styles.button}
                      onPress={handleSubmit}
                    />
                  </View>
                )}
              </Formik>
              <BottomSheet
                openRef={orderBottomSheet}
                height={520}
                render={<OrderReview />}
                lock={bottomLock}
              />
            </ScrollView>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

export default OrderTwo;
