import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';

import { RawColors } from '../styles/colors';
import ImageRotate from './ImageRotate';

const styles = StyleSheet.create({
  carrouselWrapper: {
    alignContent: 'space-between',
    // borderBottomWidth: 2,
    borderTopWidth: 0,
    borderColor: 'rgba(74,98,109, 0.1)',
    backgroundColor: '#FFFFFF',
    height: 130,
  },
  imageContainerWrapper: {
    alignSelf: 'center',
  },
  imageContainer: {
    width: 75,
    height: 75,
    marginRight: 5,
    borderColor: 'lightgray',
    borderRadius: 35,
    borderStyle: 'solid',
    borderWidth: 1.5,
    backgroundColor: '#FFFFFF',
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

  renderEmpty = () => <ActivityIndicator size="large" color="#0000ff" />;

  render() {
    const { images, args, handlerEndReach } = this.props;
    const handlerEndReachFn = handlerEndReach !== undefined ? handlerEndReach : () => {};
    return (
      <View style={styles.carrouselWrapper}>
        <FlatList
          ListEmptyComponent={this.renderEmpty()}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={images}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          onEndReached={info => handlerEndReachFn(info, this.flatList)}
          onEndReachedThreshold={0.1}
          args={args}
          ref={component => (this.flatList = component)}
        />
      </View>
    );
  }
}

export default Carrousel;
