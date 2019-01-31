import React, { Component } from 'react';
import {
  View, Text, PermissionsAndroid, FlatList,
} from 'react-native';
import {
  createStackNavigator,
  StackActions,
  NavigationActions,
  withNavigation,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import Contacts from 'react-native-contacts';
import ButtonEdit from '../../components/ButtonEdit';
import Grid from '../../styles/grid';
import { Colors, RawColors } from '../../styles/colors';
import Groups from './screen/Groups/index';
import Friends from './screen/Friends/index';
import Messages from './screen/Messages';
import FinalGroup from './screen/FinalGroup';

const TestScreen = title => () => (
  <View style={[Grid.grid]}>
    <Text>{title}</Text>
  </View>
);

const SocialNavigator = createMaterialTopTabNavigator(
  {
    Groups: {
      screen: Groups,
      navigationOptions: {
        tabBarOptions: {
          style: {
            backgroundColor: '#29434e',
          },
        },
      },
    },
    Friends: {
      screen: Friends,
      navigationOptions: {
        tabBarOptions: {
          style: {
            backgroundColor: '#29434e',
          },
        },
      },
    },
  },
  {
    initialRouteName: 'Groups',
  },
);

class Social extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { screenProps } = this.props;

    return (
      <View style={[Grid.grid]}>
        <AppNavigator />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    SocialNavigator: {
      screen: SocialNavigator,
      navigationOptions: {
        header: null,
      },
    },
    Messages: {
      screen: Messages,
    },
    FinalGroup: {
      screen: FinalGroup,
      navigationOptions: {
        headerStyle: {
          backgroundColor: RawColors.dark,
          heigth: 50,
        },
        headerTintColor: 'white',
        title: 'You New Group',
      },
    },
    headerMode: 'screen',
  },
  {
    initialRouteName: 'SocialNavigator',
  },
);
export default Social;
