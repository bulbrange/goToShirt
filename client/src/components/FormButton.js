import React, { Component } from 'react';
import {
  View, TouchableOpacity, Text, StyleSheet, Animated, Easing,
} from 'react-native';
import { RawColors } from '../styles/colors';
import Grid from '../styles/grid';

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
    backgroundColor: 'transparent',
    fontSize: 20,
    color: RawColors.white,
  },
});

class FormButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeOut: new Animated.Value(1),
      spin: new Animated.Value(0),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading) {
      this.setState({
        fadeOut: new Animated.Value(1),
        spin: new Animated.Value(0),
      });
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
    const { loading } = this.props;
    const { spin } = this.state;
    spin.setValue(0);
    Animated.timing(spin, {
      toValue: 1,
      duration: 400,
      easing: Easing.linear(),
    }).start(() => {
      if (loading) this.loopAnimation();
    });
  };

  render() {
    const {
      title, handler, loading, style = {}, logedStyle = {},
    } = this.props;
    if (loading) this.startAnimation();
    const { fadeOut, spin } = this.state;
    const spinValue = spin.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    return (
      <Animated.View
        style={[
          Grid.row,
          Grid.alignItemsCenter,
          { marginTop: 30, borderWidth: 0 },
          logedStyle,
          Grid.p0,
        ]}
      >
        <Animated.View
          style={[
            Grid.col9,
            styles.touchable,
            style,
            Grid.p0,
            {
              transform: [{ rotateX: spinValue }],
            },
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
