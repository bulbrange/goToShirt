import React, { Component } from 'react';
import { View, Text } from 'react-native';
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

const items = [
  { label: 'FILTER BY OWN', value: 'own' },
  { label: 'FILTER BY GROUP', value: 'group' },
];

class Mytshirts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: items[0].value,
    };
  }

  selectHandler = (itemValue, itemIndex) => this.setState({ filter: itemValue });

  inconHandler = () => {
    console.log('icon click');
  };

  render() {
    const { screenProps } = this.props;
    const { filter } = this.state;
    return (
      <View style={[Grid.grid]}>
        <View style={[Grid.row]}>
          <View style={[Grid.col2]}>
            <IconButton name="clipboard-list" size={45} handler={this.inconHandler} />
          </View>
          <View style={[Grid.col10]}>
            <FormSelect selectedValue={filter} handler={this.selectHandler} items={items} />
          </View>
        </View>
        <View style={[Grid.row, Grid.p0]}>
          <View style={[Grid.col6]}>
            <Text style={{ fontSize: 30 }}>
              usuario:
              {screenProps.username}
            </Text>
          </View>
          <View style={[Grid.col6]}>
            <Text style={{ fontSize: 30 }}>
              id:
              {screenProps.userId}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
export default Mytshirts;
