import React from 'react';
import { View, Image, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  NormalView,
  RegularText,
  TitleText,
  Input,
  Button,
  DoubleText,
  Loader,
} from '../../common';
import { Email, Password } from '../../../assets/svgs';
import { userLogin } from '../../store/actions/userActions';
import { styles } from './styles';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email address is required'),
  password: Yup.string().required('Password is required'),
});

const SignIn = () => {
  const { loading, loginError } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogin = (data) => {
    console.log('login data', data);
    dispatch(userLogin(data));
  };
  return (
    <>
      {loading && <Loader />}
      <NormalView>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.logo}
        />
        <View style={styles.texts}>
          <TitleText title="Welcome Back!" />
          <RegularText
            title="Enter your credentials to continue"
            style={styles.text}
          />
        </View>
        <Formik
          validationSchema={LoginSchema}
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={(values) => handleLogin(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.form}>
              {loginError !== '' && (
                <View style={styles.errorView}>
                  <RegularText title={loginError} style={styles.errorText} />
                </View>
              )}
              <View style={styles.formInput}>
                <Input
                  placeholder="Email Address"
                  icon={<Email />}
                  capitalize="none"
                  value={values.email}
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                />
                {errors.email && touched.email ? (
                  <Text style={{ fontSize: 10, color: 'red' }}>
                    {errors.email}
                  </Text>
                ) : null}
              </View>
              <View style={styles.formInput}>
                <Input
                  placeholder="Password"
                  icon={<Password />}
                  password
                  value={values.password}
                  onChange={handleChange('password')}
                  onBlur={handleBlur('password')}
                />
                {errors.password && touched.password ? (
                  <Text style={{ fontSize: 10, color: 'red' }}>
                    {errors.password}
                  </Text>
                ) : null}
              </View>
              <RegularText
                title="Trouble logging in?"
                style={styles.forgotPass}
                onPress={() => Actions.forgot_pass()}
              />
              <Button
                title="Sign In"
                style={styles.formButton}
                onPress={handleSubmit}
              />
              <DoubleText
                title="Don’t have an account yet?"
                text="Sign Up"
                onPress={() => Actions.register()}
              />
            </View>
          )}
        </Formik>
      </NormalView>
    </>
  );
};

export default SignIn;
