import React, { Component } from 'react';
import { Animated, Dimensions } from 'react-native';
import { BUBBLE_TRANSITION_DELAY, AUTH_RESET_DELAY } from '../constants/animation.constants';

const { height, width } = Dimensions.get('window');

class BubbleTransition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: new Animated.Value(1),
      fadeIn: new Animated.Value(0),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { scale, fadeIn } = this.state;

    if (nextProps.init) {
      this.startAnimation();
      setTimeout(() => {
        scale.setValue(1);
        fadeIn.setValue(0);
      }, AUTH_RESET_DELAY);
    }
  }

  startAnimation = () => {
    const { fadeIn, scale } = this.state;
    setTimeout(() => {
      Animated.timing(fadeIn, {
        toValue: 10,
        duration: 400,
      }).start();
      Animated.timing(scale, {
        toValue: 20,
        duration: 400,
      }).start();
    }, BUBBLE_TRANSITION_DELAY);
  };

  render() {
    const { scale, fadeIn } = this.state;
    return (
      <Animated.View
        style={{
          position: 'absolute',
          zIndex: 10,
          top: height / 2 - 25,
          left: width / 2 - 25,
          borderRadius: 100,
          backgroundColor: 'white',
          width: 50,
          height: 50,
          transform: [{ scale }],
          opacity: fadeIn,
        }}
      />
    );
  }
}

export default BubbleTransition;
