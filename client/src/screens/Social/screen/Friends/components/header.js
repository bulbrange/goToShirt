import React from 'react';
import {
  Text, Button, View, StyleSheet,
} from 'react-native';
import Grid from '../../../../../styles/grid';

import IconButton from '../../../../../components/IconButton';
import { RawColors, Colors } from '../../../../../styles/colors';

const styles = StyleSheet.create({
  buttonCreate: {
    flex: 0.5,
    width: 90,
    borderRadius: 25,
    height: 40,
    // right: 0,
    // bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#eee',
    margin: 5,
  },
  textDateAlert: {
    color: RawColors.light,
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'crimsontext',
    textAlign: 'right',
  },
});

const Header = ({ onPress, onPressCancel }) => (
  <View style={Grid.row}>
    <View style={styles.buttonCreate}>
      <IconButton handler={onPress} name="users" size={25} />
      <Text style={styles.textDateAlert}>new group</Text>
    </View>
    <View style={styles.buttonCreate}>
      <IconButton name="circle" size={25} handler={onPressCancel} />
      <Text style={styles.textDateAlert}>cancel</Text>
    </View>
  </View>
);

export default Header;
