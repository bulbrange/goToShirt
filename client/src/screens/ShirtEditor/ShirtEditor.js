import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import { graphql, compose } from 'react-apollo';
import Grid from '../../styles/grid';
import EditorCanvas from './components/EditorCanvas';
import OutputPanel from './components/OutputPanel';
import Loader from '../../components/Loader';
import { client } from '../../App';
import { GET_TSHIRT, GET_TEXTURES, SAVE_TEXTURES } from '../../queries/tshirt.queries';

const isTextureSelected = textures => textures.some(texture => texture.focus);

class ShirtEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switched: false,
      baseColor: '#A0A0A0',
      colorPicker: false,
      imageSlider: true,
      saved: false,
      frontTextures: [],
      backTextures: [],
      yValue: new Animated.Value(optionPanelOffsetBottom),
      texturesAdded: true,
    };
  }

  loadTexturesFromBD = () => {
    const { tshirt, tshirtTextures } = this.props;
    const { texturesAdded } = this.state;
    if (tshirtTextures && texturesAdded) {
      const res = tshirtTextures.map((x) => {
        x.source = {
          uri: `http://172.16.100.207:8080/textures/${x.source}`,
        };

        return x;
      });

      this.setState({
        frontTextures: res.filter(x => x.face === 'front'),
        backTextures: res.filter(x => x.face === 'back'),
        texturesAdded: false,
      });
    }
  };

  handleTextureFocusLost = async () => {
    const { frontTextures, backTextures } = this.state;
    await [...frontTextures, ...backTextures].map(texture => (texture.focus = false));
    this.setState({
      frontTextures,
      backTextures,
    });
  };

  handleSwitch = f => async () => {
    const { switched } = this.state;
    await this.setState({
      switched: !switched,
    });
    f();
  };

  handleBaseColor = (baseColor) => {
    const { frontTextures, backTextures } = this.state;
    if (isTextureSelected([...frontTextures, ...backTextures])) {
      [...frontTextures, ...backTextures].map(
        texture => (texture.focus ? (texture.backgroundColor = baseColor) : texture),
      );
      this.setState({
        frontTextures,
        backTextures,
      });
    } else {
      this.setState({
        baseColor,
      });
    }
  };

  handleColorPicker = () => {
    const { colorPicker } = this.state;
    this.setState({
      colorPicker: !colorPicker,
      imageSlider: false,
    });
  };

  handleImageSlider = () => {
    const { imageSlider } = this.state;
    this.setState({
      imageSlider: !imageSlider,
      colorPicker: false,
    });
  };

  handlerSave = async () => {
    const { saved, frontTextures, backTextures } = this.state;
    const { saveTextures } = this.props;
    await this.setState({
      saved: !saved,
    });
    await frontTextures.map((texture) => {
      saveTextures({
        id: texture.id,
        posX: texture.posX,
        posY: texture.posY,
        renderSize: texture.renderSize,
      });
      return null;
    });

    await backTextures.map(async (texture) => {
      await saveTextures({
        id: texture.id,
        posX: texture.posX,
        posY: texture.posY,
        renderSize: texture.renderSize,
      });
      return null;
    });

    /*     setTimeout(() => {
      console.log(this.state.saved);
      this.setState({
        saved: !this.state.saved,
      });
    }, 2000); */
  };

  handlerMock = () => console.log('Button Working');

  render() {
    const {
      switched,
      baseColor,
      colorPicker,
      imageSlider,
      frontTextures,
      backTextures,
      saved,
    } = this.state;
    this.loadTexturesFromBD();

    return (
      <View style={[Grid.grid]}>
        <View style={[Grid.row, Grid.p0, { flex: 0.7 }]}>
          <EditorCanvas
            states={{
              switched,
              baseColor,
              frontTextures,
              backTextures,
            }}
            handlers={{
              handleSwitch: this.handleSwitch,
              handleColorPicker: this.handleColorPicker,
              handleImageSlider: this.handleImageSlider,
            }}
          />
        </View>
        <View style={[Grid.row, Grid.p0, { flex: 0.3 }]}>
          <OutputPanel
            colorPicker={colorPicker}
            imageSlider={imageSlider}
            handleBaseColor={this.handleBaseColor}
            handleTextures={this.handleTextures}
          />
        </View>
        {saved ? <Loader loading={saved} /> : null}
      </View>
    );
  }
}

const tshirtQuery = graphql(GET_TSHIRT, {
  options: {
    variables: {
      id: 1,
    },
  },
  props: ({ data: { loading, tshirt } }) => ({
    loading,
    tshirt,
  }),
});

const tshirtTexturesQuery = graphql(GET_TEXTURES, {
  options: {
    variables: {
      tshirtId: 1,
    },
  },
  props: ({ data: { loading, tshirtTextures } }) => ({
    loading,
    tshirtTextures,
  }),
});

const tshirtMutation = graphql(SAVE_TEXTURES, {
  props: ({ mutate }) => ({
    saveTextures: ({
      id, posX, posY, renderSize,
    }) => mutate({
      variables: {
        id,
        posX,
        posY,
        renderSize,
      },
    }),
  }),
});

export default compose(
  tshirtQuery,
  tshirtTexturesQuery,
  tshirtMutation,
)(ShirtEditor);
