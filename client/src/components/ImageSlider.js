import React from 'react';
import { View, TouchableHighlight, Image } from 'react-native';
import ImageSlider from 'react-native-image-slider';

const Slider = (images, handler) => (
  <ImageSlider
    images={images}
    style={{ backgroundColor: 'transparent' }}
    customSlide={({ index }) => (
      // It's important to put style here because it's got offset inside
      <View key={index} style={[{ flex: 1 }]}>
        <TouchableHighlight onPress={() => handler(images[index], 100, 100)}>
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
