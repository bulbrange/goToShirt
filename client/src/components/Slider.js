import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import ImageSlider from 'react-native-image-slider';
import withLoadingHOC from './withLoadingHOC';
import { RawColors } from '../styles/colors';

const TouchableImg = ({
  image, handler, args, id,
}) => (
  <View style={[{ flex: 1 }]}>
    <TouchableOpacity onPress={() => handler(image, id, ...args)}>
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'white',
          margin: 5,
          borderColor: RawColors.dark,
          borderWidth: 1,
          borderRadius: 5,
          marginTop: 50,
          padding: 10,
        }}
      >
        <Image source={image} style={{ flex: 1, width: null, height: null }} />
      </View>
    </TouchableOpacity>
  </View>
);

class Img extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      image: null,
    };
  }

  async componentDidMount() {
    const { image } = this.props;
    setTimeout(() => {
      this.setState({
        loading: false,
        image,
      });
    }, 2000);
  }

  render() {
    const { handler, id, args } = this.props;
    const { image, loading } = this.state;
    return withLoadingHOC(TouchableImg)(loading, {
      image,
      id,
      handler,
      args,
    });
  }
}

const Slider = (images, handler) => args => (
  <ImageSlider
    images={images}
    style={{ backgroundColor: 'transparent' }}
    customSlide={({ index }) => (
      <Img
        key={index}
        image={images[index].source}
        id={images[index].id}
        handler={handler}
        args={args}
      />
    )}
  />
);

export default Slider;
