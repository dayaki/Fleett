import React, { useState } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  BackView,
  RegularText,
  TitleText,
  Input,
  Button,
  DoubleText,
} from '../../common';
import { createAccount } from '../../store/actions/userActions';
import { Email, Password, User, Phone } from '../../../assets/svgs';
import { registerStyles as styles } from './styles';

const SignupSchema = Yup.object().shape({
  fname: Yup.string().required('Required'),
  lname: Yup.string().required('Required'),
  phone: Yup.string().min(10).max(11).required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email address is required'),
  password: Yup.string().required('Password is required'),
});

const Register = ({}) => {
  const dispatch = useDispatch();

  const register = () => {
    const userData = {};
    dispatch(createAccount(userData));
  };
  return (
    <BackView isScroll>
      <View style={styles.texts}>
        <TitleText title="Let’s Get Started!" />
        <RegularText
          title="Sign up by filling the form to continue"
          style={styles.text}
        />
      </View>
      <Formik
        validationSchema={SignupSchema}
        initialValues={{
          fname: '',
          lname: '',
          phone: '',
          email: '',
          password: '',
        }}
        onSubmit={(values) => console.log('values', values)}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.form}>
            <View style={styles.input}>
              <Input
                placeholder="First Name"
                icon={<User />}
                value={values.fname}
                onChange={handleChange('fname')}
                onBlur={handleBlur('fname')}
              />
            </View>
            <Button
              title="Create Account"
              style={styles.formButton}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
      {/* <View style={styles.input}>
          <Input placeholder="First Name" icon={<User />} value />
        </View>
        <View style={styles.input}>
          <Input placeholder="Last Name" icon={<User />} />
        </View>
        <View style={styles.input}>
          <Input placeholder="Phone" icon={<Phone />} />
        </View>
        <View style={styles.input}>
          <Input placeholder="Email Address" icon={<Email />} />
        </View>
        <View style={styles.input}>
          <Input placeholder="Password" icon={<Password />} />
        </View>
        <Button title="Create Account" style={styles.formButton} />
        <DoubleText
          title="Already have an account yet?"
          text="Sign In"
          onPress={handleSubmit}
        /> */}
    </BackView>
  );
};

export default Register;
