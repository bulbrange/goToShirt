import React from 'react';
import { View, Image } from 'react-native';
import Grid from '../styles/grid';

const MainHeader = () => (
  <View style={[Grid.row, Grid.p0, { flex: 0.4 }]}>
    <Image
      style={{ flex: 1, width: null, height: null }}
      source={{
        uri: 'https://dz2cdn4.dzone.com/storage/article-thumb/210027-thumb.jpg',
      }}
    />
  </View>
);

export default MainHeader;
