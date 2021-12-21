import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { BackIcon, Plus, Minus } from '../../../../assets/svgs';
import { TitleText, Woodsmoke, ScarpaFlow, Button } from '../../../common';
import { styles } from './styles';
import { PREPARE_ORDER } from '../../../store/actions/types';

const FormSchema = Yup.object().shape({
  pickup_address: Yup.string().required('We need to know the pickup address'),
  dropoff_address: Yup.string().required('Drop-off address is required'),
  item_name: Yup.string()
    .min(5)
    .required('Name of item needed for record keeping 😃.'),
  quantity: Yup.string().required('Quantity is required'),
});

const Order = () => {
  const dispatch = useDispatch();

  const prepareOrder = (data) => {
    console.log('data', data);
    dispatch({ type: PREPARE_ORDER, payload: data });
    Actions.order_two();
  };

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
              <Formik
                validationSchema={FormSchema}
                initialValues={{
                  pickup_address: '',
                  dropoff_address: '',
                  item_name: '',
                  quantity: '',
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
                      <TitleText title="Pickup Address" style={styles.label} />
                      <TextInput
                        placeholder="Address"
                        placeholderTextColor={ScarpaFlow}
                        style={styles.textInput}
                        value={values.pickup_address}
                        onChangeText={handleChange('pickup_address')}
                        onBlur={handleBlur('pickup_address')}
                        autoCompleteType="off"
                        autoCorrect={false}
                      />
                      {errors.pickup_address && touched.pickup_address ? (
                        <Text style={{ fontSize: 10, color: 'red' }}>
                          {errors.pickup_address}
                        </Text>
                      ) : null}
                    </View>
                    <View style={styles.input}>
                      <TitleText title="Dropoff Address" style={styles.label} />
                      <TextInput
                        placeholder="Address"
                        placeholderTextColor={ScarpaFlow}
                        style={styles.textInput}
                        value={values.dropoff_address}
                        onChangeText={handleChange('dropoff_address')}
                        onBlur={handleBlur('dropoff_address')}
                        autoCompleteType="off"
                        autoCorrect={false}
                      />
                      {errors.dropoff_address && touched.dropoff_address ? (
                        <Text style={{ fontSize: 10, color: 'red' }}>
                          {errors.dropoff_address}
                        </Text>
                      ) : null}
                    </View>
                    <View style={styles.input}>
                      <TitleText title="Item name" style={styles.label} />
                      <TextInput
                        placeholder="Name of item to be delivered"
                        placeholderTextColor={ScarpaFlow}
                        style={styles.textInput}
                        value={values.item_name}
                        onChangeText={handleChange('item_name')}
                        onBlur={handleBlur('item_name')}
                      />
                      {errors.item_name && touched.item_name ? (
                        <Text style={{ fontSize: 10, color: 'red' }}>
                          {errors.item_name}
                        </Text>
                      ) : null}
                    </View>
                    <View style={styles.input}>
                      <TitleText title="Enter Quantity" style={styles.label} />
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                          placeholder="Quantity of item"
                          placeholderTextColor={ScarpaFlow}
                          style={[styles.textInput, { width: '70%' }]}
                          value={values.quantity}
                          keyboardType="number-pad"
                          onChangeText={handleChange('quantity')}
                          onBlur={handleBlur('quantity')}
                        />
                        <TouchableOpacity style={styles.inputBtn}>
                          <Minus />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.inputBtn}>
                          <Plus />
                        </TouchableOpacity>
                      </View>
                      {errors.quantity && touched.quantity ? (
                        <Text style={{ fontSize: 10, color: 'red' }}>
                          {errors.quantity}
                        </Text>
                      ) : null}
                    </View>
                    {/* <View style={styles.input}>
                <TitleText title="Notes" style={styles.label} />
                <TextInput
                  placeholder="Additional notes"
                  placeholderTextColor={ScarpaFlow}
                  style={styles.textInput}
                />
              </View> */}
                    <Button
                      title="Continue"
                      style={styles.button}
                      onPress={handleSubmit}
                    />
                  </View>
                )}
              </Formik>
            </ScrollView>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

export default Order;
