import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import IP from '../ip';
import { RawColors, Colors } from '../styles/colors';
import Grid from '../styles/grid';
import ImageRotate from './ImageRotate';
import IconButton from './IconButton';

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
      style={[styles.imageContainerWrapper]}
      onPress={() => args.handler(args.image, args.id, ...args.args)}
    >
      <View style={[Colors.shadow, styles.imageContainer]}>
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
      images,
      imagesAux: [],
      search: false,

    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.images && !this.state.search) {
      this.setState({
        images: nextProps.images
      })
    }
  }

  search = () => {
    if (!this.state.search) {
      this.setState({
        imagesAux: this.state.images,
        images: [],
        search: true
      })
    } else {
      this.setState({
        images: this.state.imagesAux,
        search: false
      })
    }

  }

  fetchingSearch = () => {
    fetch(`http://${IP}:8888/search/${this.state.textSearch}`).then(data => data.json()).then(images => this.setState({ images }))
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
        animated={false}
      />
    );
  };

  renderEmpty = () => (
    <View style={[Grid.grid, { padding: 10, flexDirection: 'row', alignItems: 'center' }]}>
      <IconButton name="jenkins" size={40} handler={() => () => { }} />
      <Text
        style={{
          fontWeight: 'bold',
          color: RawColors.dark,
          fontSize: 25,
          marginLeft: 15,
        }}
      >
        No entries found.
      </Text>
    </View>
  );

  render() {
    const { editor, args, handlerEndReach, style = {} } = this.props;
    const { images } = this.state;
    const handlerEndReachFn = handlerEndReach !== undefined ? handlerEndReach : () => { };
    return (
      <View style={[styles.carrouselWrapper, style]}>
        <FlatList
          ListEmptyComponent={editor ? <TextInput autoFocus={true} placeholder="Search images" onChangeText={(text) => this.setState({ textSearch: text })} onSubmitEditing={() => this.fetchingSearch()} /> : this.renderEmpty()}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={images}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          onEndReached={info => handlerEndReachFn(info, this.flatList)}
          onEndReachedThreshold={0.1}
          args={args}
          ref={component => (this.flatList = component)}
          ListHeaderComponent={
            editor ?
              <TouchableOpacity
                style={[styles.imageContainerWrapper]}
                onPress={() => this.search()}
              >
                <Image
                  resizeMode="contain"
                  style={{
                    flex: 1,
                    width: 50,
                    height: 50,
                    marginHorizontal: 20,
                  }}
                  source={require('../assets/icons/search.png')}
                />
              </TouchableOpacity>
              : null
          }
        />
      </View>
    );
  }
}

export default Carrousel;
