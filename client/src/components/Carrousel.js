import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, FlatList, Image,
} from 'react-native';

import { RawColors } from '../styles/colors';
import ImageRotate from './ImageRotate';

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

const TouchableImg = (args) => {
  const { animated } = args;

  return (
    <TouchableOpacity
      style={styles.imageContainerWrapper}
      onPress={() => args.handler(args.image, args.id, ...args.args)}
    >
      <View style={styles.imageContainer}>
        {animated ? (
          <ImageRotate source={args.image} />
        ) : (
          <Image
            resizeMode="contain"
            style={{
              flex: 1,
              width: null,
              height: null,
            }}
            source={args.image}
          />
        )}
      </View>
      <Text style={styles.name}>{args.name}</Text>
    </TouchableOpacity>
  );
};

class Carrousel extends Component {
  constructor(props) {
    super(props);
    const { images } = this.props;
    this.state = {
      current: images[0],
    };
  }

  keyExtractor = (item, index) => item.id.toString();

  renderItem = ({ item }) => {
    const { args, animated } = this.props;
    return (
      <TouchableImg
        image={item.source}
        id={item.id}
        handler={this.props.handler}
        name={item.name}
        args={args}
        animated={animated}
      />
    );
  };

  render() {
    const { images, args } = this.props;
    return (
      <View style={styles.carrouselWrapper}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={images}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          args={args}
        />
      </View>
    );
  }
}

export default Carrousel;
