import React from 'react';
import { View, Image } from 'react-native';

const withLoadingHOC = Component => ({ loading, props }) => (loading ? (
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
        uri:
            'https://media1.tenor.com/images/8ac12962c05648c55ca85771f4a69b2d/tenor.gif?itemid=9212724',
      }}
    />
  </View>
) : (
  <Component {...props} />
));

export default withLoadingHOC;
