import React, { Component } from 'react';
import Draggable from 'react-native-draggable';
import { collisionX, collisionY, shouldRefresh } from '../utilities/collisionLogic';

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
      source, renderSize, updatePosition, handleSwitch, id,
    } = this.props;

    return (
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
        resizeMode="contain"
      />
    );
  }
}

export default Texture;
