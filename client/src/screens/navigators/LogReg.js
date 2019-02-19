import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation'; // Version can be specified in package.json
import Login from '../Login';
import Register from '../Register/Register';
import IconFont from '../../components/IconFont';
import { RawColors, Colors } from '../../styles/colors';

const LogReg = createMaterialTopTabNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      tabBarOptions: {
        labelStyle: {
          fontSize: 12,
        },
        style: {
          backgroundColor: RawColors.primary,
        },
      },
    },
  },
  Register: {
    screen: Register,
    navigationOptions: {
      tabBarOptions: {
        labelStyle: {
          fontSize: 12,
        },
        style: {
          backgroundColor: RawColors.primary,
        },
      },
    },
  },
});
/*
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
*/
export default LogReg;
