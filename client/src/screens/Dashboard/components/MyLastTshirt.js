import React, { Component } from 'react';
import {
  Image, View, TouchableOpacity, Text,
} from 'react-native';
import Sound from 'react-native-sound';
import Grid from '../../../styles/grid';
import Carrousel from '../../../components/Carrousel';
import mockedTshirts from '../mockedTshirts';

class MyLastTshirt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImageSelected: null,
      name: 'Last T-shirt',
      selected: null,
    };
    this.sound = new Sound('button.mp3', Sound.MAIN_BUNDLE, (error) => {});
  }

  onImageSelected = (source, id) => {
    const selected = mockedTshirts.filter(x => x.id === id)[0];
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

  handler = () => console.log('pepetter');

  render() {
    const { screenProps } = this.props;
    const { filter, currentImageSelected } = this.state;
    return (
      <View style={[Grid.grid, Grid.p0]}>
        <View style={[Grid.row, Grid.p0, { flex: 0.5 }]}>
          <TouchableOpacity style={[Grid.col12, { paddingTop: 10 }]}>
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
        <View style={[Grid.row, Grid.p0, Grid.justifyBetween, { flex: 0.5 }]}>
          <Carrousel images={mockedTshirts} handler={this.onImageSelected} animated args={[]} />
        </View>
      </View>
    );
  }
}

export default MyLastTshirt;
