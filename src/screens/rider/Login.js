import React from 'react';
import { View, Image, TextInput } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  RegularText,
  TitleText,
  ScarpaFlow,
  Button,
  FormErrorText,
} from '../../common';
import { loginStyles as styles } from './styles';
import { riderLogin } from '../../store/actions/riderActions';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email address is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const { loading, loginError } = useSelector((state) => state.rider);
  const dispatch = useDispatch();

  const handleLogin = (data) => {
    console.log('login data', data);
    dispatch(riderLogin(data));
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.logo}
        />
        <TitleText title="Make More Money." style={styles.title} />
        <RegularText
          title="Enter your credentials to access your dashboard."
          style={styles.introText}
        />
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
              {loginError && (
                <View style={styles.errorView}>
                  <RegularText title={loginError} style={styles.errorText} />
                </View>
              )}
              <View style={styles.input}>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor={ScarpaFlow}
                  style={styles.textInput}
                  autoCapitalize="none"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                />
                {errors.email && touched.email ? (
                  <FormErrorText message={errors.email} />
                ) : null}
              </View>

              <View style={styles.input}>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor={ScarpaFlow}
                  style={styles.textInput}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  secureTextEntry
                />

                {errors.password && touched.password ? (
                  <FormErrorText message={errors.password} />
                ) : null}
              </View>
              <Button
                title="Sign In"
                style={styles.button}
                onPress={handleSubmit}
                isLoading={loading}
              />
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;
