import React, { Component } from 'react';
import { View, Alert, ActivityIndicator } from 'react-native';
import prompt from 'react-native-prompt-android';
import Grid from '../../../styles/grid';
import EditorCanvas from './EditorCanvas/EditorCanvas';
import OutputPanel from './OutputPanel/OutputPanel';
import namePrompter from './utilities/save-shirt.protocol';
import saveTexture from './utilities/save-textures.protocol';
import IP from '../../../ip';

const isTextureSelected = textures => textures.some(texture => texture.focus);

class ShirtEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switched: false,
      shirtName: '',
      baseColor: '#CC2222',
      saving: true,
      actualShirt: undefined,
      frontTextures: [],
      backTextures: [],
    };
  }

  componentDidMount() {
    const { tshirt, addNewShirt } = this.props;
    if (tshirt) {
      const frontTextures = tshirt.texture.filter(t => t.face === 'front');
      const backTextures = tshirt.texture.filter(t => t.face === 'back');
      [...frontTextures, ...backTextures].map(t => t.text.length ? t.source : t.source = `http://${IP}:8080/textures/${t.source}`);
      this.setState({
        shirtName: tshirt.name,
        baseColor: tshirt.color,
        saving: false,
        actualShirt: tshirt,
        frontTextures,
        backTextures,
      });
    }
    if (addNewShirt) {
      this.setState({
        saving: false,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tshirt) {
      const frontTextures = nextProps.tshirt.texture.filter(t => t.face === 'front');
      const backTextures = nextProps.tshirt.texture.filter(t => t.face === 'back');
      [...frontTextures, ...backTextures].map(t => t.text.length ? t.source : t.source = `http://${IP}:8080/textures/${t.source}`);
      this.setState({
        shirtName: nextProps.tshirt.name,
        baseColor: nextProps.tshirt.color,
        saving: false,
        actualShirt: nextProps.tshirt,
        frontTextures,
        backTextures,
      });
    }
  }

  handleTextures = async (
    source,
    _,
    posX,
    posY,
    renderSize,
    backgroundColor,
    text = '',
    tintColor,
  ) => {
    const { frontTextures, backTextures, switched } = this.state;
    const id = Date.now();
    const newTexture = {
      source,
      posX,
      posY,
      renderSize,
      id,
      backgroundColor,
      focus: false,
      rotate: '0deg',
      text,
      tintColor,
    };
    if (!switched) {
      await this.setState({
        frontTextures: [...frontTextures, newTexture],
      });
    } else {
      await this.setState({
        backTextures: [...backTextures, newTexture],
      });
    }
  };

  handleSwitch = async () => {
    const { switched } = this.state;
    await this.setState({
      switched: !switched,
    });
    this.handleTextureFocusLost();
  };

  handleBaseColor = (baseColor, bgColor = true) => {
    const { frontTextures, backTextures } = this.state;
    if (isTextureSelected([...frontTextures, ...backTextures])) {
      [...frontTextures, ...backTextures].map((texture) => {
        if (bgColor && texture.focus) {
          texture.backgroundColor = baseColor;
        } else if (!bgColor && texture.focus) {
          console.log('@handleBaseColor', baseColor);
          texture.tintColor = baseColor;
        } else {
          texture;
        }
        return texture;
      });
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

  handleText = (text, source) => {
    const { frontTextures, backTextures } = this.state;
    if (isTextureSelected([...frontTextures, ...backTextures])) {
      [...frontTextures, ...backTextures].map((texture) => {
        if (texture.focus) {
          texture.text = text;
          texture.source = source;
        }
        return texture;
      });
      this.setState({
        frontTextures,
        backTextures,
      });
    }
  };

  handleShirtName = (text) => {
    this.setState({
      shirtName: text.trim(),
    });
  }

  handleActualShirt = (actualShirt) => {
    this.setState({
      actualShirt,
    });
  }

  handleRotation = (val) => {
    const { frontTextures, backTextures } = this.state;
    [...frontTextures, ...backTextures].map((texture) => {
      if (texture.focus) texture.rotate = `${val}deg`;
      return texture;
    });
    this.setState({
      frontTextures,
      backTextures,
    });
  };

  handleCreateNewShirt = () => {
    const { shirtName, baseColor } = this.state;
    const { addNewShirt } = this.props;
    // Mocking userId --> 1 by the moment as params[0]
    namePrompter(addNewShirt,
      [1, shirtName, baseColor], // <--- params
      this.handleShirtName,
      this.handleActualShirt,
      this.handleSave);
      console.log("FRONT", this.state.frontTextures);
      console.log("BACK", this.state.backTextures);
  }

  handleSave = async () => {
    const { frontTextures, backTextures, actualShirt, shirtName, baseColor } = this.state;
    const { addTexture, cleanShirtTextures, updateShirtName, updateShirtColor } = this.props;
    if (!actualShirt) await this.handleCreateNewShirt();
    else {
      this.setState({
        saving: true,
      });
      try {
        await cleanShirtTextures(actualShirt.id);
        [...frontTextures, ...backTextures].map(t => t.source.includes('/') ? t.source = t.source.split('/')[4] : t.source);
        if (shirtName.trim().length) await updateShirtName(actualShirt.id, shirtName)
        else {
          await this.setState({ shirtName: actualShirt.name });
          Alert.alert('Watch out!! You can´t leave a shirt without name.', `Using last name saved('${actualShirt.name}') for now :P`);
        }
        await saveTexture(addTexture, this.state.actualShirt, frontTextures, 'front');
        await saveTexture(addTexture, this.state.actualShirt, backTextures, 'back');
        await updateShirtColor(actualShirt.id, baseColor);
        await [...frontTextures, ...backTextures].map(t => t.text.length ? t.source : t.source = `http://${IP}:8080/textures/${t.source}`);
        await this.setState({
          saving: false,
          frontTextures,
          backTextures,
        });
        await Alert.alert(`T-Shirt: ${actualShirt.name}`, 'All good. State saved!');

        await fetch(`http://${IP}:8080/${actualShirt.id}`).then((data) => console.log(data));
        console.log("FRONTFINALK", this.state.frontTextures);
        console.log("BACKFINALK", this.state.backTextures);
      } catch (err) {
        Alert.alert('Something went wrong...', 'Your t-shirt state was not saved.');
      }
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

  handleBabylon = () => {
    const { navigation: { navigate } } = this.props;
    const { actualShirt, shirtName } = this.state;
    navigate('WebViewer', { shirtID: actualShirt.id, shirtName });
  }

  render() {
    const {
      switched, baseColor, frontTextures, backTextures, shirtName, saving,
    } = this.state;
    console.log("FINALLLL FRONT:", frontTextures)
    console.log("FINALLLL BACK:", backTextures)
    if (saving) return (<ActivityIndicator style={[Grid.grid, Grid.col12, Grid.alignMiddle]} size="large" color="#0000ff" />);
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
              handleTextureFocusLost: this.handleTextureFocusLost,
              handleSwitch: this.handleSwitch,
            }}
          />
        </View>
        <View style={[Grid.row, Grid.p0, { flex: 0.3, zIndex: 1 }]}>
          <OutputPanel
            states={{
              switched,
              baseColor,
              frontTextures,
              backTextures,
              shirtName,
            }}
            handlers={{
              handleTextures: this.handleTextures,
              handleRotation: this.handleRotation,
              handleBaseColor: this.handleBaseColor,
              handleSwitch: this.handleSwitch,
              handleCarrousel: this.handleCarrousel,
              handleSlider: this.handleSlider,
              handleText: this.handleText,
              handleSave: this.handleSave,
              handleShirtName: this.handleShirtName,
              handleBabylon: this.handleBabylon,
            }}
          />
        </View>
      </View>
    );
  }
}

export default ShirtEditor;
