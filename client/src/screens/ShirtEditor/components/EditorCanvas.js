import React, { Component } from 'react';
import { View, Image } from 'react-native';
import Draggable from 'react-native-draggable';
import Grid from '../../../styles/grid';
import Colors from '../../../styles/colors';

const front = require('../images/bases/front.png');
const back = require('../images/bases/back.png');

const img = (source, baseColor) => (
  <Image style={{ flex: 1, width: null, height: null }} source={source} tintColor={baseColor} />
);
// tintColor="rgba(0, 0, 0, 0.9)"

class EditorCanvas extends Component {
  constructor(props) {
    super(props);
    const { switched, baseColor } = this.props;
  }

  render() {
    const { switched, baseColor } = this.props;
    console.log('SWITCHED<<<<<<', switched);

    return (
      <View style={[Grid.row, Colors.white, { flex: 0.6 }]}>
        {switched ? img(back, baseColor) : img(front, baseColor)}
        <Draggable
          reverse={false}
          renderSize={56}
          renderColor="black"
          offsetX={-100}
          offsetY={-100}
          renderText="A"
          pressDrag={() => alert('touched!!')}
        />
        <Draggable
          reverse={false}
          renderColor="blue"
          renderShape="square"
          offsetX={0}
          offsetY={0}
          renderText="B"
        />
        <Draggable reverse={false} />
      </View>
    );
  }
}

export default EditorCanvas;

/*        <Draggable
          reverse={false}
          renderSize={56}
          renderColor="black"
          offsetX={-100}
          offsetY={-100}
          renderText="A"
          pressDrag={() => alert('touched!!')}
        />
        <Draggable
          reverse={false}
          renderColor="red"
          renderShape="square"
          offsetX={0}
          offsetY={0}
          renderText="B"
        />
        <Draggable reverse={false} />
        */
