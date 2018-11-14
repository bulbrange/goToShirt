import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  shadowBackground: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
});

const backgroundImg = (source, shadow, baseColor, handleTextureFocusLost) => (
  <TouchableOpacity style={{ flex: 1, zIndex: -1 }} onPress={() => handleTextureFocusLost()}>
    <Image style={{ flex: 1, width: null, height: null }} source={source} tintColor={baseColor} />
    <Image style={[styles.shadowBackground, {}]} source={shadow} />
  </TouchableOpacity>
);

export default backgroundImg;
