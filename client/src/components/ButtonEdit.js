import React, { Component } from 'react';
import {
  View, Text, TouchableHighlight, StyleSheet, Dimensions, Animated,
} from 'react-native';
import { RawColors, Colors } from '../styles/colors';
import ButtonEditOption from './ButtonEditOption';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  wrapperOn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width,
    height,
    zIndex: 99,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  wrapperOff: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 0,
    height: 0,
    zIndex: 99,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  buttonWrapper: {
    width: 50,
    borderRadius: 35,
    height: 50,
    position: 'absolute',
    right: 50,
    bottom: 100,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: RawColors.dark,
  },
  buttonText: {
    fontSize: 30,
    color: 'white',
  },
});

class ButtonEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: false,
    };
  }

  // componentDidMount() {
  //   Animated.timing(this.state.transition, {
  //     toValue: width,
  //     duration: 300,
  //   });
  // }

  // componentDidMount() {
  //   Animated.timing(this.state.transitionH, {
  //     toValue: height,
  //     duration: 300,
  //   });
  // }

  handlerEdit = () => {
    const { tab } = this.state;
    this.setState({
      tab: !tab,
    });
  };

  render() {
    const { tab } = this.state;
    const pepetter = tab ? 'X' : '+';

    return (
      <View>
        {tab ? <ButtonEditOption /> : null}
        <TouchableHighlight onPress={this.handlerEdit} style={styles.buttonWrapper}>
          <Text style={styles.buttonText}>{pepetter}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default ButtonEdit;
