import React from 'react';
import { View, Text, Image } from 'react-native';
import Grid from '../styles/grid';
import fonts from '../styles/fonts';
import { Colors2, RawColors2 } from '../styles/colors';

const MainHeader = ({ fontSize }) => (
  <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ fontFamily: 'BEBAS', fontSize, color: 'rgba(0,0,0,0.7)' }}>Go To Shirt</Text>
  </View>
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
