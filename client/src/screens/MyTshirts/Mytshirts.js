import React, { Component } from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet,
} from 'react-native';
import Sound from 'react-native-sound';
import Grid from '../../styles/grid';
import FormSelect from '../../components/FormSelect';
import IconButton from '../../components/IconButton';
import MyTshirtsOptions from './components/MyTshirtsOptions';
import { Colors, RawColors } from '../../styles/colors';
import mockedTshirts from './mockedTshirts';
import Carrousel from '../../components/Carrousel';

// This data will be from DB user->groups
const items = [
  { label: 'FILTER BY OWN', value: 'own' },
  { label: 'FILTER BY GROUP', value: 'group' },
];

const styles = StyleSheet.create({
  changeSide: {
    position: 'absolute',
    right: 15,
    top: 0,
    zIndex: 51,
    padding: 15,
  },
});

class Mytshirts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: items[0].value,
      currentImageSelected: null,
      name: 'Select a T-shirt',
      selected: null,
      isFront: true,
      options: false,
    };
    this.sound = new Sound('button.mp3', Sound.MAIN_BUNDLE, (error) => {});
  }

  selectHandler = (itemValue, itemIndex) => this.setState({ filter: itemValue });

  onChangeSide = () => {
    const { selected, isFront } = this.state;
    if (selected === null) return;

    this.setState({
      currentImageSelected: isFront ? selected.sourceBack : selected.source,
      isFront: !isFront,
    });
  };

  onImagePress = () => {
    const { selected } = this.state;
    if (selected === null) return;
    this.setState({
      options: true,
    });
  };

  onImageSelected = (source, id) => {
    const selected = mockedTshirts.filter(x => x.id === id)[0];

    this.setState({
      currentImageSelected: source,
      selected,
      isFront: true,
      name: selected.name,
    });
    this.sound.stop();
    setTimeout(() => {
      Sound.setCategory('Playback', true);
      this.sound.play();
    }, 1);
  };

  onCancelPress = () => {
    this.setState({
      options: false,
    });
  };

  render() {
    const { screenProps } = this.props;
    const {
      filter, currentImageSelected, name, options,
    } = this.state;
    return (
      <View style={[Grid.grid, Colors.white]}>
        {options ? <MyTshirtsOptions cancelHandler={this.onCancelPress} /> : null}
        <View style={[Grid.row, { flex: 0.1 }]}>
          <View style={[Grid.col12]}>
            <FormSelect selectedValue={filter} handler={this.selectHandler} items={items} />
          </View>
        </View>
        <View style={[Grid.row, Grid.justifyCenter, { flex: 0.05, marginTop: 10 }]}>
          <Text style={{ fontWeight: 'bold', color: RawColors.dark, fontSize: 20 }}>{name}</Text>
        </View>
        <View style={[Grid.row, { flex: 0.55 }]}>
          <IconButton
            name="exchange-alt"
            size={35}
            handler={this.onChangeSide}
            styles={styles.changeSide}
          />
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
          <Carrousel images={mockedTshirts} handler={this.onImageSelected} animated args={[]} />
        </View>
      </View>
    );
  }
}

export default Mytshirts;
