import React from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BackView, RegularText, TitleText, Input, Button } from '../../common';
import { createAccount } from '../../store/actions/userActions';
import { Email, Password, User, Phone } from '../../../assets/svgs';
import { registerStyles as styles } from './styles';

const SignupSchema = Yup.object().shape({
  fname: Yup.string().required('Your first name is required'),
  lname: Yup.string().required('Your last name is required'),
  phone: Yup.string()
    .min(11, ({ min }) => `Phone number must be ${min} numbers`)
    .max(11)
    .required('Your phone number is needed.'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email address is required'),
  password: Yup.string().required('Password is required'),
});

const Register = () => {
  const { loading, registerError } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const register = (data) => {
    console.log('data', data);
    dispatch(createAccount(data));
  };

  return (
    <KeyboardAwareScrollView>
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
          onSubmit={(values) => register(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.form}>
              {registerError !== '' && (
                <View style={styles.errorView}>
                  <RegularText
                    title={
                      registerError?.email
                        ? registerError?.email[0]
                        : registerError?.phone[0]
                    }
                    style={styles.errorText}
                  />
                </View>
              )}
              <View style={styles.input}>
                <Input
                  placeholder="First Name"
                  icon={<User />}
                  value={values.fname}
                  onChange={handleChange('fname')}
                  onBlur={handleBlur('fname')}
                  error={errors.fname ? true : false}
                  disable={loading}
                />
                {errors.fname && touched.fname ? (
                  <Text style={{ fontSize: 10, color: 'red' }}>
                    {errors.fname}
                  </Text>
                ) : null}
              </View>
              <View style={styles.input}>
                <Input
                  placeholder="Last Name"
                  icon={<User />}
                  value={values.lname}
                  onChange={handleChange('lname')}
                  onBlur={handleBlur('lname')}
                  error={errors.lname ? true : false}
                  disable={loading}
                />
                {errors.lname && touched.lname ? (
                  <Text style={{ fontSize: 10, color: 'red' }}>
                    {errors.lname}
                  </Text>
                ) : null}
              </View>
              <View style={styles.input}>
                <Input
                  placeholder="Phone"
                  icon={<Phone />}
                  value={values.phone}
                  onChange={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  error={errors.phone ? true : false}
                  keyboardType="numeric"
                  disable={loading}
                />
                {errors.phone && touched.phone ? (
                  <Text style={{ fontSize: 10, color: 'red' }}>
                    {errors.phone}
                  </Text>
                ) : null}
              </View>
              <View style={styles.input}>
                <Input
                  placeholder="Email Address"
                  icon={<Email />}
                  value={values.email}
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                  capitalize="none"
                  keyboardType="email-address"
                  error={true}
                  disable={loading}
                />
                {errors.email && touched.email ? (
                  <Text style={{ fontSize: 10, color: 'red' }}>
                    {errors.email}
                  </Text>
                ) : null}
              </View>
              <View style={styles.input}>
                <Input
                  placeholder="Password"
                  icon={<Password />}
                  value={values.password}
                  onChange={handleChange('password')}
                  onBlur={handleBlur('password')}
                  error={errors.password ? true : false}
                  capitalize="none"
                  password
                  disable={loading}
                />
                {errors.password && touched.password ? (
                  <Text style={{ fontSize: 10, color: 'red' }}>
                    {errors.password}
                  </Text>
                ) : null}
              </View>
              <Button
                title="Create Account"
                style={styles.formButton}
                onPress={handleSubmit}
                isLoading={loading}
              />
            </View>
          )}
        </Formik>
      </BackView>
    </KeyboardAwareScrollView>
  );
};

export default Register;
