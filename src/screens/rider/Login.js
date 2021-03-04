import React from 'react';
import { View, Image, TextInput } from 'react-native';
import { RegularText, TitleText, ScarpaFlow, Button } from '../../common';
import { loginStyles as styles } from './styles';

const Login = () => {
  return (
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
      <View style={styles.form}>
        <View style={styles.input}>
          <TextInput
            placeholder="Email"
            placeholderTextColor={ScarpaFlow}
            style={styles.textInput}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            placeholder="Password"
            placeholderTextColor={ScarpaFlow}
            style={styles.textInput}
          />
          <Button title="Sign In" style={styles.button} />
        </View>
      </View>
    </View>
  );
};

export default Login;
