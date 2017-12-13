import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  NativeModules,
  TouchableHighlight,
  Image
} from 'react-native';

var SpotifyModule = NativeModules.SpotifyModule;
var _this;

export default class LoginScreen extends Component<{}> {

  render() {
    _this = this;
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.button} onPress={() =>
          {
          SpotifyModule.loggedIn((res) => {
            if(!res) {
              SpotifyModule.startAuthenticationFlow((error) => {
                if(!error){
                  navigate('Home')
                } else {
                  console.warn('Error signing in: ' + error)
                }
              });
            } else {
              navigate('Home')
            }
          })
        }}>
          <Image source={require('../../assets/spotify-button.png')} />
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
