import React, { Component } from 'react';
import {
  View, Text, StyleSheet, FlatList,
} from 'react-native';
import { Colors, RawColors } from '../../../styles/colors';
import Grid from '../../../styles/grid';
import StackHeader from '../../../components/StackHeader';
import IconButton from '../../../components/IconButton';
import Group from '../../Social/screen/Groups/components/group';

class Share extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGroups: [],
    };
  }

  renderItem = ({ item }) => (
    <View
      style={[
        Grid.container,
        Grid.grid,
        { padding: 10, flexDirection: 'row', alignItems: 'center' },
      ]}
    >
      <IconButton name="share" size={20} handler={() => () => {}} />
      <Text
        style={{
          fontWeight: 'bold',
          color: RawColors.dark,
          fontSize: 20,
          marginLeft: 15,
        }}
      >
        {item.name}
      </Text>
    </View>
  );

  renderEmpty = () => {};

  keyExtractor = (item, index) => item.id.toString();

  render() {
    const {
      navigation,
      navigation: { state, goBack },
    } = this.props;

    const groups = state.params.groups;
    const tshirt = state.params.tshirt;
    const tshirtId = tshirt.id;

    const finalGroups = groups.filter((group) => {
      const found = group.tshirts.edges.filter(edge => edge.node.id === tshirtId);
      console.log('Found', found);
      return found.length === 0;
    });

    return (
      <View style={{ flex: 1 }}>
        <StackHeader title={tshirt.name} goBack={goBack} />
        <View style={Grid.grid}>
          <View style={Grid.row}>
            <FlatList
              data={finalGroups}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default Share;
