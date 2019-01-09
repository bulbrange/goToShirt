import React from 'react';
import {
  View, FlatList, StyleSheet, Dimensions,
} from 'react-native';
import IconButton from '../../../../../components/IconButton';
import { Colors, RawColors } from '../../../../../styles/colors';
import Grid from '../../../../../styles/grid';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(50,50,50)',
    width,
  },
});

const renderItem = ({ item }) => (
  <View
    style={[
      {
        width: 50,
        height: 35,
      },
    ]}
  >
    <IconButton
      size={20}
      handler={item.handler}
      name={item.name}
      styles={[
        {
          color: 'rgb(220,220,220)',
          flex: 1,
          marginLeft: 13,
          marginTop: 10,
        },
        Grid.alignMiddle,
      ]}
    />
  </View>
);
const keyExtractor = (item, index) => item.name;

const OptionPanel = ({ names, handlers }) => {
  const buttons = names.map((item, index) => ({
    name: names[index],
    handler: handlers[index],
  }));
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal
      data={buttons}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      style={styles.container}
    />
  );
};
export default OptionPanel;
