import React, { Component } from 'react';
import { View, TouchableHighlight, Image } from 'react-native';
import ImageSlider from 'react-native-image-slider';
import withLoadingHOC from './withLoadingHOC';

const TouchableImg = ({ image, handler, args }) => (
  <View style={[{ flex: 1 }]}>
    <TouchableHighlight onPress={() => handler(image, ...args)}>
      <Image
        source={image}
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'white',
          margin: 5,
          borderColor: 'black',
          borderWidth: 1,
          borderRadius: 5,
          marginTop: 50,
        }}
      />
    </TouchableHighlight>
  </View>
);
const imgFetch = WrappedComponent => class Img extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      image: null,
    };
  }

  componentDidMount() {
    const { image } = this.props;
    setTimeout(() => {
      this.setState({
        loading: true,
        image,
      });
    }, 5000);
    console.log(image);
  }

  render() {
    const { handler, args } = this.props;
    const { image, loading } = this.state;
    return (
      <WrappedComponent
        loading={loading}
        image={image}
        handle={handle}
        args={args}
        {...this.props}
      />
    );
  }
};
// withLoadingHOC(TouchableImg)(loading, { image, handler, args });
const Slider = (images, handler) => args => (
  <ImageSlider
    images={images}
    style={{ backgroundColor: 'transparent' }}
    customSlide={({ index }) => (
      <View key={index} style={[{ flex: 1 }]}>
        <TouchableHighlight onPress={() => handler(images[index], ...args)}>
          <Image
            source={images[index]}
            style={{
              width: 100,
              height: 100,
              backgroundColor: 'white',
              margin: 5,
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 5,
              marginTop: 50,
            }}
          />
        </TouchableHighlight>
      </View>
    )}
  />
);

export default Slider;
/*
      <View key={index} style={[{ flex: 1 }]}>
        <TouchableHighlight onPress={() => handler(images[index], ...args)}>
          <Image
            source={images[index]}
            style={{
              width: 100,
              height: 100,
              backgroundColor: 'white',
              margin: 5,
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 5,
              marginTop: 50,
            }}
          />
        </TouchableHighlight>
      </View>


            <View style={{ flex: 1 }}>
        <Image
          style={{
            width: 100,
            height: 100,
            backgroundColor: 'white',
            margin: 5,
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 5,
            marginTop: 50,
          }}
          source={{
            uri: 'https://loading.io/spinners/balls/lg.circle-slack-loading-icon.gif',
          }}
        />
      </View>
*/
