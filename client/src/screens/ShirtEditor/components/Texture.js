import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Draggable from './Draggable';

const styles = StyleSheet.create({
  focusOn: {
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 5,
  },
});
class Texture extends Component {
  constructor(props) {
    super(props);
    const { posX, posY } = this.props;
    this.state = {
      originalX: posX,
      originalY: posY,
    };
  }

  render() {
    const { originalX, originalY } = this.state;
    const {
      source, renderSize, updatePosition, handleSwitch, id, posX, posY, focus,
    } = this.props;

    return (
      <Draggable
        id={id}
        source={source}
        posX={posX}
        posY={posY}
        focus={focus}
        renderSizeX={renderSize}
        renderSizeY={renderSize}
        updatePosition={updatePosition}
        handleSwitch={handleSwitch}
      />
    );
  }
}
/*

      <Draggable
        ref={(texture) => {
          this.texture = texture;
        }}
        renderShape="image"
        imageSource={source}
        reverse={false}
        renderSize={renderSize}
        renderColor="black"
        x={originalX}
        y={originalY}
        pressDragRelease={async () => {
          console.log(this.texture);
          const newX = Math.floor(this.texture.state._value.x + originalX);
          const newY = Math.floor(this.texture.state._value.y + originalY);
          await updatePosition(
            source,
            collisionX(newX, renderSize),
            collisionY(newY, renderSize),
            id,
          );
          if (shouldRefresh(newX, newY, renderSize)) {
            await handleSwitch();
            await handleSwitch();
          }
        }}
      />

*/
export default Texture;
