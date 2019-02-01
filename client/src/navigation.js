import React, { Component } from 'react';
import {
  createMaterialTopTabNavigator,
  createStackNavigator,
  NavigationActions,
  StackActions,
} from 'react-navigation';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import {
  BackHandler, Text, View, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

import LogReg from './screens/navigators/LogReg';
import MainTabNavigator from './screens/navigators/MainTabNavigator';
import ShirtEditor, { EditShirt } from './screens/ShirtEditor';
import WebViewer from './screens/WebViewer';
import Messages from './screens/Social/screen/Messages';
import Share from './screens/MyTshirts/share/Share';

// tabs in main screen
const AppNavigator = createStackNavigator(
  {
    LogReg: {
      screen: LogReg,
    },
    MainTabNavigator: {
      screen: MainTabNavigator,
    },
    ShirtEditor: {
      screen: ShirtEditor,
    },
    EditShirt: {
      screen: EditShirt,
    },
    WebViewer: {
      screen: WebViewer,
    },
    Messages: {
      screen: Messages,
    },
    Share: {
      screen: Share,
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'MainTabNavigator',
  },
);

// reducer initialization code
const initialState = AppNavigator.router.getStateForAction(
  StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName: 'MainTabNavigator',
      }),
    ],
  }),
);
export const navigationReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};
// Note: createReactNavigationReduxMiddleware must be run before createReduxBoundAddListener
export const navigationMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);
const App = reduxifyNavigator(AppNavigator, 'root');
const mapStateToProps = state => ({
  state: state.nav,
});

class AppWithBackPress extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch } = this.props;
    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    return <App {...this.props} />;
  }
}

const AppWithNavigationState = connect(mapStateToProps)(AppWithBackPress);
export default AppWithNavigationState;
