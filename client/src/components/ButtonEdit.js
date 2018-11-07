import React, { Component } from 'react';
import {
  View, Text, TouchableHighlight, StyleSheet, Dimensions, Animated,
} from 'react-native';
import { RawColors, Colors } from '../styles/colors';

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
    color: RawColors.white,
  },
});

class ButtonEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: false,
      transition: new Animated.ValueXY(),
    };
  }

  // compoponentDiMount = () => {
  //   this.state.trans{
  //     toIdValue: 1,
  //     durati
  //   }
  // };
  // wrapperAnimation = () => {
  //   const { height, width } = Dimensions.get('window');
  //   const { tab, transition } = this.state;
  //   const newW = tab ? width : 0;
  //   const newY = tab ? height : 0;
  //   Animated.ValueXY(transition, {
  //     x: newW,
  //     y: newY,
  //     duration: 2500,
  //   }).start(async (res) => {
  //     if (res.finished) {
  //       this.setState({
  //         wth: x,
  //         hth: y,
  //       });
  //     }
  //   });
  // };

  handlerEdit = () => {
    const { tab } = this.state;
    this.setState({
      tab: !tab,
    });
  };

  moveAnimation = () => {
    const paco = tab ? styles.wrapperOn : styles.wrapperOff;
  };

  render() {
    const { tab } = this.state;
    const pepe = tab ? styles.wrapperOn : styles.wrapperOff;
    const pepetter = tab ? 'X' : '+';

    return (
      <View>
        <Animated.View style={pepe} />
        <TouchableHighlight onPress={this.handlerEdit} style={styles.buttonWrapper}>
          <Text style={styles.buttonText}>{pepetter}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default ButtonEdit;
