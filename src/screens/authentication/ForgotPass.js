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

const ForgotPass = ({}) => {
  return (
    <BackView isScroll>
      <View style={styles.texts}>
        <TitleText title="Forgot Your Password?" />
        <RegularText
          title="Enter your email to recover your password"
          style={styles.text}
        />
      </View>
      <View style={styles.form}>
        <View style={styles.input}>
          <Input placeholder="Email Address" icon={<Email />} />
        </View>
        <Button title="Recover Passwords" style={styles.formButton} />
        <DoubleText
          title="Remember your password?"
          text="Sign In"
          onPress={() => Actions.sign_in()}
        />
      </View>
    </BackView>
  );
};

export default ForgotPass;
