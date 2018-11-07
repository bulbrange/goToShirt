import React, { Component } from 'react';
import {
  View, Text, Image, TouchableHighlight, Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  createStackNavigator,
  StackActions,
  NavigationActions,
  withNavigation,
} from 'react-navigation';
import Grid from '../../styles/grid';
import { RawColors, Colors } from '../../styles/colors';
import FormSelect from '../../components/FormSelect';
import IconButton from '../../components/IconButton';
import Slider from '../../components/Slider';

// This data will be from DB user->groups
const items = [
  { label: 'FILTER BY OWN', value: 'own' },
  { label: 'FILTER BY GROUP', value: 'group' },
];

const front = require('../ShirtEditor/images/bases/front.png');
const back = require('../ShirtEditor/images/bases/back.png');

const mockedTshirts = [front, front, back, front, back, back, front, back];

class Mytshirts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: items[0].value,
      currentImageSelected: null,
    };
  }

  selectHandler = (itemValue, itemIndex) => this.setState({ filter: itemValue });

  inconHandler = () => {
    console.log('icon click');
  };

  onImageSelected = (source) => {
    this.setState({
      currentImageSelected: source,
    });
  };

  render() {
    const { screenProps } = this.props;
    const { filter, currentImageSelected } = this.state;
    return (
      <View style={[Grid.grid]}>
        <View style={[Grid.row, { flex: 0.1 }]}>
          <View style={[Grid.col2]}>
            <IconButton name="clipboard-list" size={45} handler={this.inconHandler} />
          </View>
          <View style={[Grid.col10]}>
            <FormSelect selectedValue={filter} handler={this.selectHandler} items={items} />
          </View>
        </View>
        <View style={[Grid.row, { flex: 0.6 }]}>
          <Image
            resizeMode="contain"
            style={{ flex: 1, width: null, height: null }}
            source={currentImageSelected}
          />
        </View>
        <View style={[Grid.row, { flex: 0.3 }]}>
          {Slider(mockedTshirts, this.onImageSelected)([])}
        </View>
      </View>
    );
  }
}
export default Mytshirts;
