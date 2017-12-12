/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  NativeModules,
  TouchableHighlight,
  Image
} from 'react-native';

export default class MosaicPlayer extends Component<{}> {

  componentWillMount() {
    console.warn("componentWillMount")
  }

  showLogInfo() {
    var LoggingManager = NativeModules.LoggingManager;
    LoggingManager.logMessage('Initializing');
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.button} onPress={this.showLogInfo}>
          <Image source={require('./assets/spotify-button.png')} />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    width: 300,
    height: 54
  }
});
