import React from 'react';
import { View, Image } from 'react-native';

const withLoadingHOC = Component => (loading, props) => (loading ? (
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
) : (
  <Component {...props} />
));

export default withLoadingHOC;
