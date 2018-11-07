import React, { Component } from 'react';
import {
  View, Text, TouchableHighlight, StyleSheet, Dimensions, Animated,
} from 'react-native';
import { RawColors, Colors } from '../styles/colors';
import IconButton from './IconButton';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  wrapperOn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 0,
    height: 0,
    zIndex: 99,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  buttonCreate: {
    width: 50,
    borderRadius: 35,
    height: 50,
    position: 'absolute',
    // right: 0,
    // bottom: 0,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: RawColors.dark,
  },
});

class ButtonEditOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animateW: new Animated.Value(0),
      animateH: new Animated.Value(0),
      animateBottonCreateGroup: new Animated.ValueXY(),
      animateBottonCreateShirt: new Animated.ValueXY(),
      animateBottonConf: new Animated.ValueXY(0, 0),
    };
  }

  componentDidMount() {
    const {
      animateW,
      animateH,
      animateBottonCreateGroup,
      animateBottonCreateShirt,
      animateBottonConf,
    } = this.state;
    Animated.timing(animateW, {
      toValue: width,
      duration: 500,
    }).start();
    Animated.timing(animateH, {
      toValue: height,
      duration: 500,
    }).start();
    Animated.timing(animateBottonCreateGroup, {
      toValue: { x: 190, y: 70 },
      duration: 700,
    }).start();
    Animated.timing(animateBottonCreateShirt, {
      toValue: { x: 150, y: 150 },
      duration: 700,
    }).start();
    Animated.timing(animateBottonConf, {
      toValue: { x: 90, y: 210 },
      duration: 700,
    }).start();
  }

  componentWillUnmount() {
    const { animateW, animateH } = this.state;
    Animated.timing(animateW, {
      toValue: 0,
      duration: 300,
    }).start();
    Animated.timing(animateH, {
      toValue: 0,
      duration: 300,
    }).start();
  }

  render() {
    const {
      animateW,
      animateH,
      animateBottonCreateGroup,
      animateBottonConf,
      animateBottonCreateShirt,
    } = this.state;
    return (
      <Animated.View style={[styles.wrapperOn, { width: animateW, height: animateH }]}>
        <Animated.View
          style={[
            styles.buttonCreate,
            { right: animateBottonCreateShirt.x },
            { bottom: animateBottonCreateShirt.y },
            { backgroundColor: 'orange' },
          ]}
        >
          <IconButton name="tshirt" size={25} handler={this.inconHandler} />
        </Animated.View>
        <Animated.View
          style={[
            styles.buttonCreate,
            { right: animateBottonCreateGroup.x },
            { bottom: animateBottonCreateGroup.y },
            { backgroundColor: 'white' },
          ]}
        >
          <IconButton name="users" size={25} handler={this.inconHandler} />
        </Animated.View>

        <Animated.View
          style={[
            styles.buttonCreate,
            { right: animateBottonConf.x },
            { bottom: animateBottonConf.y },
            { backgroundColor: 'red' },
          ]}
        >
          <IconButton name="cog" size={25} handler={this.inconHandler} />
        </Animated.View>
      </Animated.View>
    );
  }
}

export default ButtonEditOption;
