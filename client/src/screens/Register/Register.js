import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, StackActions, NavigationActions } from 'react-navigation';

const Register = () => {
  const { goBack } = this.props.navigation;
  return (
    <View style={{ flex: 1 }}>
      <Text onPress={() => goBack()}>REGISTER VIEW</Text>
    </View>
  );
};

export default Register;
