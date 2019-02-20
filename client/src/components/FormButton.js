import React, { Component } from 'react';
import {
  View, TouchableOpacity, Text, StyleSheet, Animated, Easing,
} from 'react-native';
import { Colors, RawColors, Colors2 } from '../styles/colors';
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
    fontSize: 20,
    color: RawColors.white,
  },
});
// touchable ---> [Colors2.primary, { height: 30 }]

class FormButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animatedWidth: new Animated.Value(0.75),
      fadeOut: new Animated.Value(1),
      borderLeftWidth: new Animated.Value(3),
      borderWidth: new Animated.Value(3),
      spin: new Animated.Value(0),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading) {
      this.setState({
        animatedWidth: new Animated.Value(0.75),
        fadeOut: new Animated.Value(1),
        borderLeftWidth: new Animated.Value(3),
        borderWidth: new Animated.Value(3),
        spin: new Animated.Value(0),
      });
    }
  }

  startAnimation = () => {
    Animated.timing(this.state.animatedWidth, {
      toValue: 0.15,
      duration: 500,
    }).start(() => this.loopAnimation());
    Animated.timing(this.state.borderWidth, {
      toValue: 2,
      duration: 300,
    }).start();
    Animated.timing(this.state.fadeOut, {
      toValue: 0,
      duration: 400,
    }).start();
    Animated.timing(this.state.borderLeftWidth, {
      toValue: 0,
      duration: 300,
    }).start();
  };

  loopAnimation = () => {
    const { loading } = this.props;
    this.state.spin.setValue(0);
    Animated.timing(this.state.spin, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear(),
    }).start(() => {
      if (loading) this.loopAnimation();
    });
  }

  render() {
    const { title, handler, loading } = this.props;
    if (loading) this.startAnimation();
    const {
      animatedWidth, borderWidth, borderLeftWidth, fadeOut, spin,
    } = this.state;
    const spinValue = spin.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    return (
      <View style={[Grid.row, Grid.alignItemsCenter, Grid.p0, { marginTop: 30 }]}>
        <Animated.View
          style={[
            Grid.col9,
            styles.touchable,
            { flex: animatedWidth, borderWidth, borderLeftWidth, transform: [{ rotate: spinValue }] },
          ]}
        >
          <TouchableOpacity style={[]} onPress={() => handler()}>
            <View style={[styles.textContainer]}>
              <Animated.Text style={[styles.text, { opacity: fadeOut }]}>{title}</Animated.Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}

export default FormButton;
