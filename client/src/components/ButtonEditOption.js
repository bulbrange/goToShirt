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
    borderTopLeftRadius: 55770,
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
      animateB: new Animated.Value(700),
    };
  }

  componentDidMount() {
    const {
      animateB,
      animateW,
      animateH,
      animateBottonCreateGroup,
      animateBottonCreateShirt,
      animateBottonConf,
    } = this.state;
    Animated.timing(animateW, {
      toValue: width,
      duration: 300,
    }).start();
    Animated.timing(animateH, {
      toValue: height,
      duration: 300,
    }).start();
    Animated.timing(animateBottonConf, {
      toValue: { x: 50, y: 200 },
      duration: 200,
    }).start();
    Animated.timing(animateBottonCreateShirt, {
      toValue: { x: 120, y: 170 },
      duration: 200,
    }).start();
    Animated.timing(animateBottonCreateGroup, {
      toValue: { x: 150, y: 100 },
      duration: 200,
    }).start();
    Animated.timing(animateB, {
      toValue: 0,
      duration: 400,
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

  goEditor = () => {
    const {
      navigation: { navigate },
    } = this.props;

    navigate('ShirtEditor');
  };

  goSocial = () => {
    const {
      navigation: { navigate },
    } = this.props;

    navigate('Social');
  };

  render() {
    const {
      animateB,
      animateW,
      animateH,
      animateBottonCreateGroup,
      animateBottonConf,
      animateBottonCreateShirt,
    } = this.state;
    return (
      <Animated.View
        style={[
          styles.wrapperOn,
          {
            width: animateW,
            height: animateH,
            borderTopLeftRadius: animateB,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.buttonCreate,
            { right: animateBottonCreateShirt.x },
            { bottom: animateBottonCreateShirt.y },
            { backgroundColor: 'orange' },
            { justifyContent: 'center' },
            { alignItems: 'center' },
          ]}
        >
          <IconButton name="tshirt" size={25} handler={this.goEditor} />
        </Animated.View>
        <Animated.View
          style={[
            styles.buttonCreate,
            { right: animateBottonCreateGroup.x },
            { bottom: animateBottonCreateGroup.y },
            { backgroundColor: 'white' },
          ]}
        >
          <IconButton name="users" size={25} handler={this.goSocial} />
        </Animated.View>

        <Animated.View
          style={[
            styles.buttonCreate,
            { right: animateBottonConf.x },
            { bottom: animateBottonConf.y },
            { backgroundColor: 'red' },
          ]}
        >
          <IconButton name="cog" size={25} handler={() => console.log()} />
        </Animated.View>
      </Animated.View>
    );
  }
}

export default ButtonEditOption;
