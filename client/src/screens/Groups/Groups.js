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
import Colors from '../../styles/colors';
import Chats from './screen/Chats/Chats';
import Friends from './screen/Friends/index';

const TestScreen = title => () => (
  <View style={[Grid.grid]}>
    <Text>{title}</Text>
  </View>
);

const SocialNavigator = createMaterialTopTabNavigator(
  {
    Chats: {
      screen: Chats,
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
    initialRouteName: 'Chats',
  },
);

class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: items[0].value,
      currentImageSelected: null,
      name: 'Select a Group',
      selected: null,
      options: false,
    };

    this.sound = new Sound('button.mp3', Sound.MAIN_BUNDLE, (error) => {});
  }

  onImagePress = () => {
    const { selected } = this.state;
    if (selected === null) return;
    this.setState({
      options: true,
    });
    const {
      navigation: { navigate },
    } = this.props;

    navigate('Mytshirts', {
      id: null,
      title: null,
    });
  };

  onImageSelected = (source, id) => {
    const selected = mockedGroups.filter(x => x.id === id)[0];

    this.setState({
      currentImageSelected: source,
      selected,
      name: selected.name,
    });
    this.sound.stop();
    setTimeout(() => {
      Sound.setCategory('Playback', true);
      this.sound.play();
    }, 1);
  };

  selectHandler = (itemValue, itemIndex) => this.setState({ filter: itemValue });

  render() {
    const { screenProps } = this.props;

    return (
      <View style={[Grid.grid]}>
        <SocialNavigator />
      </View>
    );
  }
}
export default Groups;
