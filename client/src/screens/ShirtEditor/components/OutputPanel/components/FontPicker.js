import React, { Component } from 'react';
import {
  View, Picker, Text, StyleSheet, TouchableOpacity, TextInput
} from 'react-native';
import fs from 'react-native-fs';
import Grid from '../../../../../styles/grid';
import Colors, { RawColors } from '../../../../../styles/colors';
//import isTextureSelected from '../OutputPanel';

const posX = 85;
const posY = 100;
const renderSize = 30;

const triggerFunctions = async (f, g) => {
  f();
  await g();
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  picker: {
    height: 30,
    backgroundColor: RawColors.light,
  },
});

class FontPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFont: undefined,
      fonts: undefined,
      text: '',

    };
  }

  async componentDidMount() {
    const readedFonts = await fs.readDirAssets('fonts');
    this.setState({
      fonts: readedFonts,
      activeFont: readedFonts[0].name.split('.')[0],
    });
  }

  componentWillReceiveProps(nextProps) {
    const actualFocus = nextProps.textures.filter(texture => texture.focus);
    if (actualFocus[0]) {
      this.setState({
        text: actualFocus[0].text,
      });
    }

  }
  componentWillUpdate(nextProps, nextState) {
    const { onTextChange } = this.props;
    const { activeFont } = this.state;
    const actualFocus = nextProps.textures.filter(texture => texture.focus);
    if (actualFocus[0] && activeFont !== nextState.activeFont) {
      onTextChange(actualFocus[0].text, nextState.activeFont);
    }
    console.log("lastSTATE: ", activeFont)
    console.log("nextState: ", nextState.activeFont)
  }
  render() {
    const { fonts, activeFont, text } = this.state;
    const { handler, textures, onTextChange } = this.props;
    //const isSelected = isTextureSelected(textures);
    //console.log('>>>>>>>>', isSelected);
    //console.log('<<<<<<<', textures);
    const selectedTexture = textures.filter(texture => texture.focus);
    console.log(selectedTexture[0] && selectedTexture[0].text);
    return (
      <View style={[Grid.grid]}>
        <View style={[Grid.row, { flex: 0.3 }]}>
          <View style={[Grid.col12]}>
            <Picker
              selectedValue={activeFont}
              style={[styles.picker]}
              onValueChange={(itemValue, itemIndex) => this.setState({ activeFont: itemValue })}
            >
              {fonts
                ? fonts.map(font => (
                  <Picker.Item
                    key={font.name}
                    label={font.name.split('.')[0]}
                    value={font.name.split('.')[0]}
                  />
                ))
                : undefined}
            </Picker>
          </View>
        </View>
        <View style={[Grid.row, { flex: 0.7 }]}>
          <TouchableOpacity
            style={[Grid.col12]}
            onPress={() => handler(activeFont, null, posX, posY, renderSize, 'black', 'bnjhgkj')}
          >
            <TextInput
              style={[styles.text, { fontFamily: activeFont }]}
              onChangeText={text => {
                textures.some(texture => texture.focus) ? triggerFunctions(() => onTextChange(text, activeFont), () => this.setState({ text: selectedTexture[0].text })) : this.setState({ text })
              }}
              placeholder="CLICK TO ADD TEXT"
              onSubmitEditing={() => {
                !textures.some(texture => texture.focus) ? triggerFunctions(() => handler(activeFont, null, posX, posY, renderSize, 'black', text), () => this.setState({ text: '' })) : null
              }}
              value={this.state.text}
            />


          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default FontPicker;
