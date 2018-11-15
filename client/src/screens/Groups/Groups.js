import React, { Component } from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet,
} from 'react-native';
import Sound from 'react-native-sound';
import Grid from '../../styles/grid';
import FormSelect from '../../components/FormSelect';
import IconButton from '../../components/IconButton';
import { Colors, RawColors } from '../../styles/colors';
import mockedGroups from './mockedGroups';
import Carrousel from '../../components/Carrousel';

const items = [
  { label: 'ORDER BY DATE', value: 'date' },
  { label: 'OORDER BY MEMBERS', value: 'members' },
];

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
    const {
      filter, currentImageSelected, name, options,
    } = this.state;
    return (
      <View style={[Grid.grid, Colors.white]}>
        <View style={[Grid.row, { flex: 0.1 }]}>
          <View style={[Grid.col12]}>
            <FormSelect selectedValue={filter} handler={this.selectHandler} items={items} />
          </View>
        </View>
        <View style={[Grid.row, Grid.justifyCenter, { flex: 0.05, marginTop: 10 }]}>
          <Text style={{ fontWeight: 'bold', color: RawColors.dark, fontSize: 20 }}>{name}</Text>
        </View>
        <View style={[Grid.row, { flex: 0.55 }]}>
          <TouchableOpacity onPress={this.onImagePress} style={[Grid.col12, { paddingTop: 10 }]}>
            <Image
              resizeMode="contain"
              style={{
                flex: 1,
                width: null,
                height: null,
              }}
              source={currentImageSelected}
            />
          </TouchableOpacity>
        </View>
        <View style={[Grid.row, Grid.p0, Grid.alignMiddle, { flex: 0.3 }]}>
          <Carrousel images={mockedGroups} handler={this.onImageSelected} animated args={[]} />
        </View>
      </View>
    );
  }
}
export default Groups;
