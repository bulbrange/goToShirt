import React, { Component } from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet, FlatList,
} from 'react-native';
import Grid from '../../styles/grid';
import { RawColors } from '../../styles/colors';
import ImageRotate from './components/ImageRotate';

const styles = StyleSheet.create({
  carrouselWrapper: {
    backgroundColor: RawColors.white,
    alignContent: 'space-between',
    flex: 1,
  },
  imageContainerWrapper: {
    alignSelf: 'center',
  },
  imageContainer: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    marginRight: 5,
    borderColor: RawColors.dark,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    padding: 10,
  },
  name: {
    textAlign: 'center',
    color: RawColors.dark,
  },
});

const TouchableImg = args => (
  <TouchableOpacity
    style={styles.imageContainerWrapper}
    onPress={() => args.handler(args.image, args.id)}
  >
    <View style={styles.imageContainer}>
      <ImageRotate source={args.image} />
    </View>
    <Text style={styles.name}>{args.name}</Text>
  </TouchableOpacity>
);

class Carrousel extends Component {
  constructor(props) {
    super(props);
    const { images } = this.props;
    this.state = {
      current: images[0],
    };
  }

  keyExtractor = (item, index) => item.id.toString();

  renderItem = ({ item }) => (
    <TouchableImg image={item.source} id={item.id} handler={this.props.handler} name={item.name} />
  );

  render() {
    const { images } = this.props;
    return (
      <View style={styles.carrouselWrapper}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={images}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

export default Carrousel;
