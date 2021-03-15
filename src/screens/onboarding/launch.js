import { View, Text } from 'react-native';
import React from 'react';

const Launch = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{ color: 'black' }}>Loading...</Text>
    </View>
  );
};

export default Launch;
