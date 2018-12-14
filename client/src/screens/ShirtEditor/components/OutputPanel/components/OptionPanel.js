import React from 'react';
import {
  View, FlatList, StyleSheet, Dimensions,
} from 'react-native';
import IconButton from '../../../../../components/IconButton';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(50,50,50)',
    width,
  },
  animation: {
    backgroundColor: 'rgba(180,180,180,0.6)',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
  },
});

const renderItem = ({ item }) => (
  <View>
    <IconButton
      size={28}
      handler={item.handler}
      name={item.name}
      styles={{
        color: 'rgb(220,220,220)',

        paddingVertical: 5,
        paddingHorizontal: 15,
        // marginHorizontal: 15,
        // backgroundColor: 'rgb(90,90,90)',
      }}
    />
  </View>
);
const keyExtractor = (item, index) => item.name;

const OptionPanel = ({
  names, handlers, animationValues, position, buttonStyle,
}) => {
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
