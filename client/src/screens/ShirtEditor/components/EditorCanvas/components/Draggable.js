import React, { Component } from 'react';
import {
  StyleSheet, Image, PanResponder, Animated, View, Text,
} from 'react-native';
import { collision, shouldRefresh } from '../utilities/collisionLogic';
import IconButton from '../../../../../components/IconButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
  },
  onFocus: {
    borderWidth: 2,
    borderColor: 'rgba(0, 255, 0, 1)',
  },
  delete: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: 'white',
    padding: 5,
    zIndex: 5,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
});

export default class Draggable extends Component {
  constructor(props) {
    super(props);
    const { posX, posY } = this.props;
    this.state = {
      pan: new Animated.ValueXY({ x: posX, y: posY }),
      scale: new Animated.Value(1),
      valueX: 0,
      valueY: 0,
    };
  }

  componentWillMount() {
    const {
      id,
      source,
      updatePosition,
      handleSwitch,
      renderSizeX,
      renderSizeY,
      collisionSize,
    } = this.props;
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: async (e, gestureState) => {
        this.state.pan.setOffset({ x: this.state.pan.x._value, y: this.state.pan.y._value });
        this.state.pan.setValue({ x: 0, y: 0 });

        Animated.spring(this.state.scale, { toValue: 1, friction: 3 }).start();
        this.setState({
          valueX: this.state.pan.x._value,
          valueY: this.state.pan.y._value,
        });
      },

      onPanResponderMove: Animated.event([null, { dx: this.state.pan.x, dy: this.state.pan.y }]),

      onPanResponderRelease: async (e, { vx, vy }) => {
        this.state.pan.flattenOffset();
        Animated.spring(this.state.scale, { toValue: 1, friction: 3 }).start();

        const newX = Math.floor(this.state.pan.x._value);
        const newY = Math.floor(this.state.pan.y._value);

        await updatePosition(
          source,
          collision(newX, renderSizeX, collisionSize.width),
          collision(newY, renderSizeY, collisionSize.height),
          id,
        );
        if (shouldRefresh(newX, newY, renderSizeX, collisionSize.width, collisionSize.height)) {
          await handleSwitch();
          await handleSwitch();
        }
      },
    });
  }

  render() {
    const { pan, scale } = this.state;
    const {
      id,
      source,
      renderSizeX,
      renderSizeY,
      focus,
      backgroundColor,
      handleRemoveTexture,
      rotate,
      text,
    } = this.props;
    const [translateX, translateY] = [pan.x, pan.y];

    const imageStyle = { transform: [{ translateX }, { translateY }, { rotate }, { scale }] };

    const focusStyle = focus ? styles.onFocus : undefined;
    return (
      <Animated.View
        style={[
          imageStyle,
          styles.container,
          { backgroundColor: text.length ? 'transparent' : backgroundColor },
        ]}
        {...this._panResponder.panHandlers}
      >
        <View style={[focusStyle]}>
          {focus ? (
            <IconButton
              name="times-circle"
              size={32}
              handler={() => handleRemoveTexture(id)}
              styles={styles.delete}
            />
          ) : null}
          {text.length ? (
            <Text
              style={{
                color: backgroundColor,
                fontSize: renderSizeX,
                fontFamily: source,
                padding: 10,
              }}
            >
              {text}
            </Text>
          ) : (
            <Image style={{ width: renderSizeX, height: renderSizeY }} source={source} />
          )}
        </View>
      </Animated.View>
    );
  }
}
