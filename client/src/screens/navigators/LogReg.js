import React from 'react';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
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
    headerMode: 'none',
  },
);

export default LogReg;
