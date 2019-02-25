import React, { Component } from 'react';
import { Picker, StyleSheet, View } from 'react-native';
import { Colors, RawColors } from '../styles/colors';

const styles = StyleSheet.create({
  wrapper: {
    borderBottomWidth: 0,
    borderColor: RawColors.dark,
    color: RawColors.dark,
  },
});
class FormSelect extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  componentDidMount() {
    const { selectedValue } = this.props;

    this.setState({
      value: selectedValue,
    });
  }

  onChange = async (itemValue, itemIndex) => {
    const { handler } = this.props;

    await this.setState({
      value: itemValue,
    });

    handler(itemValue, itemIndex);
  };

  render() {
    const { handler, items } = this.props;

    return (
      <View style={[styles.wrapper]}>
        <Picker
          selectedValue={this.state.value}
          onValueChange={(itemValue, itemIndex) => this.onChange(itemValue, itemIndex)}
        >
          {items.map(x => (
            <Picker.Item color={RawColors.dark} key={x.label} label={x.label} value={x.value} />
          ))}
        </Picker>
      </View>
    );
  }
}

export default FormSelect;
