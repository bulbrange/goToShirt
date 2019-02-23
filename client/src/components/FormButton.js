import React, { Component } from 'react';
import {
  View, TouchableOpacity, Text, StyleSheet, Animated, Easing,
} from 'react-native';
import { RawColors } from '../styles/colors';
import Grid from '../styles/grid';
import { START_LOGGED_ANIMATION } from '../constants/animation.constants';

const styles = StyleSheet.create({
  touchable: {
    borderColor: RawColors.white,
    borderRadius: 50,
    backgroundColor: 'transparent',
    height: 60,
    color: RawColors.white,
    paddingTop: 10,
  },
  textContainer: {
    padding: 0,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  text: {
    textAlign: 'center',
    fontFamily: 'BEBAS',
    color: RawColors.white,
    backgroundColor: 'transparent',
    fontSize: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

class FormButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeOut: new Animated.Value(1),
      spin: new Animated.Value(0),
      marginTop: new Animated.Value(20),
      backgroundColor: new Animated.Value(0),
      fadeOutLogin: new Animated.Value(1),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { isLoading } = this.props;

    if (!nextProps.isLoading && !nextProps.init) {
      this.resetStates();
    }
    if (nextProps.init && isLoading) {
      this.startLoggedAnimation();
    }
  }

  startAnimation = () => {
    const { fadeOut } = this.state;

    Animated.timing(fadeOut, {
      toValue: 0,
      duration: 400,
    }).start();
    this.loopAnimation();
  };

  loopAnimation = () => {
    const { isLoading } = this.props;
    const { spin, fadeOut } = this.state;
    spin.setValue(0);
    Animated.timing(spin, {
      toValue: 1,
      duration: 400,
      easing: Easing.linear(),
    }).start(() => {
      if (isLoading) this.loopAnimation();
      else fadeOut.setValue(1);
    });
  };

  startLoggedAnimation = () => {
    const { navigation, route } = this.props;
    const { backgroundColor, fadeOutLogin } = this.state;

    Animated.timing(backgroundColor, {
      toValue: 1,
      duration: 1000,
    }).start();
    setTimeout(() => {
      Animated.timing(fadeOutLogin, {
        toValue: 0,
        duration: 300,
      }).start(() => {
        setTimeout(() => {
          navigation.navigate(route);
          this.resetStates();
        }, 650);
      });
    }, START_LOGGED_ANIMATION);
  };

  resetStates = () => {
    const {
      marginTop, backgroundColor, fadeOutLogin, fadeOut, spin,
    } = this.state;
    marginTop.setValue(20);
    backgroundColor.setValue(0);
    fadeOutLogin.setValue(1);
    fadeOut.setValue(1);
    spin.setValue(0);
  };

  render() {
    const {
      title, handler, isLoading, style = {},
    } = this.props;
    const { marginTop, backgroundColor, fadeOutLogin } = this.state;

    if (isLoading) this.startAnimation();

    const { fadeOut, spin } = this.state;
    const spinValue = spin.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    const bg = backgroundColor.interpolate({
      inputRange: [0, 1],
      outputRange: ['transparent', 'rgba(120, 255, 120, 0.7)'],
    });
    const border = backgroundColor.interpolate({
      inputRange: [0, 1],
      outputRange: ['white', 'rgba(0, 220, 0, 0.7)'],
    });
    return (
      <Animated.View
        style={[
          Grid.row,
          Grid.alignItemsCenter,
          { marginTop: 30, borderWidth: 0 },
          Grid.p0,
        ]}
      >
        <Animated.View
          style={[
            Grid.col9,
            styles.touchable,
            Grid.p0,
            {
              borderColor: border,
              borderWidth: 3,
              transform: [{ rotateX: spinValue }],
              marginTop,
              backgroundColor: bg,
              opacity: fadeOutLogin,
            },
            style,
          ]}
        >
          <TouchableOpacity style={[Grid.p0, { zIndex: 10 }]} onPress={() => handler()}>
            <View style={[styles.textContainer]}>
              <Animated.Text style={[styles.text, { opacity: fadeOut }]}>{title}</Animated.Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  }
}

export default FormButton;
