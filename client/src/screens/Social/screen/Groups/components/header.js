import React from 'react';
import {
  Text, Button, View, StyleSheet,
} from 'react-native';
import IconButton from '../../../../../components/IconButton';
import { RawColors, Colors } from '../../../../../styles/colors';

const styles = StyleSheet.create({
  buttonCreate: {
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

const Header = ({ onPress }) => (
  <View style={{ alignItems: 'center' }}>
    <View style={styles.buttonCreate}>
      <IconButton name="users" size={25} handler={onPress} />
      <Text style={styles.textDateAlert}>new group</Text>
    </View>
  </View>
);

export default Header;
