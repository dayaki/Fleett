import React from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  BackView,
  RegularText,
  TitleText,
  Input,
  Button,
  DoubleText,
} from '../../common';
import { Email, Password, User, Phone } from '../../../assets/svgs';
import { registerStyles as styles } from './styles';

const Register = ({}) => {
  return (
    <BackView isScroll>
      <View style={styles.texts}>
        <TitleText title="Let’s Get Started!" />
        <RegularText
          title="Sign up by filling the form to continue"
          style={styles.text}
        />
      </View>
      <View style={styles.form}>
        <View style={styles.input}>
          <Input placeholder="First Name" icon={<User />} />
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
          onPress={() => Actions.sign_in()}
        />
      </View>
    </BackView>
  );
};

export default Register;
