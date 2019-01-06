import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, FlatList, Image,
} from 'react-native';

import { RawColors } from '../styles/colors';
import ImageRotate from './ImageRotate';

const styles = StyleSheet.create({
  carrouselWrapper: {
    alignContent: 'space-between',
    // borderBottomWidth: 2,
    borderTopWidth: 0,
    borderColor: 'rgba(74,98,109, 0.1)',
    backgroundColor: 'rgba(166,191,204, 0.05)',
    height: 130,
  },
  imageContainerWrapper: {
    alignSelf: 'center',
  },
  imageContainer: {
    width: 75,
    height: 75,
    marginRight: 5,
    borderColor: 'rgba(74,98,109, 0.2)',
    borderRadius: 35,
    borderStyle: 'solid',
    borderWidth: 1.5,
    backgroundColor: 'rgba(166,191,204, 0.05)',
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
          <ImageRotate source={{ uri: args.image }} />
        ) : (
          <Image
            resizeMode="contain"
            style={{
              flex: 1,
              width: null,
              height: null,
            }}
            source={{ uri: args.image }}
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
