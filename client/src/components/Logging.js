import React, { Component } from 'react';
import {
  TextInput, Text, Image, View, Button,
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';

class Logging extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jander: true,
    };
  }

  render() {
    return (
      <Grid>
        <Row size={3}>
          <Image
            style={{ flex: 1, width: null, height: null }}
            source={{
              uri: 'https://dz2cdn4.dzone.com/storage/article-thumb/210027-thumb.jpg',
            }}
          />
        </Row>

        <Row size={1} style={{ backgroundColor: '#AD9999' }}>
          <Row size={1}>
            <View style={{ width: 380, marginTop: 30 }}>
              <Text style={{ textAlign: 'center', fontSize: 22 }}>User</Text>
            </View>
          </Row>
          <Row size={3}>
            <TextInput
              style={{
                flex: 0.9,
                marginTop: 60,
                marginLeft: -80,
                height: 40,
                borderColor: 'gray',
                borderBottomWidth: 1,
              }}
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
            />
          </Row>
        </Row>
        <Row size={1} style={{ backgroundColor: '#AD9999' }}>
          <Row size={1}>
            <View style={{ width: 380, marginTop: 10 }}>
              <Text style={{ textAlign: 'center', fontSize: 22 }}>Password</Text>
            </View>
          </Row>
          <Row size={3}>
            <TextInput
              style={{
                flex: 0.9,
                marginTop: 40,
                marginLeft: -80,
                height: 40,
                borderColor: 'gray',
                borderBottomWidth: 1,
              }}
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
            />
          </Row>
        </Row>
        <Row size={1} style={{ backgroundColor: '#AD9999' }}>
          <Col style={{ marginTop: 20, flex: 0.9, marginLeft: 22 }}>
            <Button onPress={() => console.log('JANDER')} title="Log in" color="#D32B2B" />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Logging;
