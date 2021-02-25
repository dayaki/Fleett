import React from 'react';
import { View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  NormalView,
  RegularText,
  TitleText,
  Input,
  Button,
  DoubleText,
} from '../../common';
import { Email, Password } from '../../../assets/svgs';
import { styles } from './styles';

const SignIn = ({}) => {
  return (
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
      <View style={styles.form}>
        <View style={styles.formInput}>
          <Input placeholder="Email Address" icon={<Email />} />
        </View>
        <View style={styles.formInput}>
          <Input placeholder="Password" icon={<Password />} />
        </View>
        <RegularText
          title="Trouble logging in?"
          style={styles.forgotPass}
          onPress={() => Actions.forgot_pass()}
        />
        <Button title="Sign In" style={styles.formButton} />
        <DoubleText
          title="Don’t have an account yet?"
          text="Sign Up"
          onPress={() => Actions.register()}
        />
      </View>
    </NormalView>
  );
};

export default SignIn;
