import React from 'react';
import {
  View, Text, Image, Animated,
} from 'react-native';
import Grid from '../styles/grid';
import fonts from '../styles/fonts';
import { Colors2, RawColors2 } from '../styles/colors';

const MainHeader = ({ fontSize, flex }) => (
  <Animated.View style={{ flex, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ fontFamily: 'GREALN', fontSize, color: 'rgba(0,0,0,0.7)' }}>Go To Shirt</Text>
  </Animated.View>
);

export default MainHeader;

/*
<Image
      style={[
        {
          flex: 1,
          width: null,
          height: null,
        },
      ]}
      resizeMode="cover"
      source={{
        uri: 'https://facebook.github.io/react/logo-og.png',
      }}
    />


*/
