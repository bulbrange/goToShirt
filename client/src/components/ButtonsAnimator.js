import React, { Component } from 'react';
import { Animated, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  buttonWrapper: {
    position: 'absolute',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    top: 0,
  },
});

class ButtonsAnimator extends Component {
  constructor(props) {
    super(props);
    // [] Buttons, [] { top, left}, [] { top, left}
    const { buttons, initialPositions } = this.props;

    const animatedInitialPositions = initialPositions.map(x => ({
      top: new Animated.Value(x.top),
      left: new Animated.Value(x.left),
      right: new Animated.Value(x.right),
    }));

    this.state = {
      buttons: buttons.map((button, i) => ({
        button,
        actualPosition: animatedInitialPositions[i],
      })),
    };
  }

  componentDidMount() {
    const { buttons } = this.state;
    const { finalPositions, duration, increse } = this.props;
    let newDuration = duration;

    buttons.forEach((x, i) => {
      Animated.timing(buttons[i].actualPosition.top, {
        toValue: finalPositions[i].top,
        duration: newDuration,
      }).start();

      if (finalPositions[i].left && buttons[i].actualPosition.left) {
        Animated.timing(buttons[i].actualPosition.left, {
          toValue: finalPositions[i].left,
          duration: newDuration,
        }).start();
      }

      if (finalPositions[i].right && buttons[i].actualPosition.right) {
        Animated.timing(buttons[i].actualPosition.right, {
          toValue: finalPositions[i].right,
          duration: newDuration,
        }).start();
      }

      newDuration += increse;
    });
  }

  render() {
    const { buttons } = this.state;

    console.log(buttons);
    return buttons.map((x, i) => (
      <Animated.View
        // eslint-disable-next-line react/no-array-index-key
        key={i}
        style={[
          styles.buttonWrapper,
          { top: x.actualPosition.top, left: x.actualPosition.left, right: x.actualPosition.right },
        ]}
      >
        {x.button}
      </Animated.View>
    ));
  }
}

export default ButtonsAnimator;
