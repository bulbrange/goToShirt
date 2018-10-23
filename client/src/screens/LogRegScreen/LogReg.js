import React from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json
import Login from '../Login/Login';
import Register from '../Register/Register';

const LogReg = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    Register: {
      screen: Register,
    },
  },
  {
    initialRouteName: 'Login',
  },
);

export default LogReg;
