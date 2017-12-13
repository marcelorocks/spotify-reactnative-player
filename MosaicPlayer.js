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

var SPOTIFY_CLIENT_ID     = 'c15098f2925b4ccf99fa86defd4cbe3b'
var SPOTIFY_REDIRECT_URL  = 'mosaicplayer://callback'
var SPOTIFY_SCOPES        = ['streaming']

var SpotifyModule = NativeModules.SpotifyModule;
var LoggingManager = NativeModules.LoggingManager;
var _this;

export default class MosaicPlayer extends Component<{}> {

  initializeSpotify() {
    SpotifyModule.initWithCredentials(SPOTIFY_CLIENT_ID,
      SPOTIFY_REDIRECT_URL,
      SPOTIFY_SCOPES,
      (sucess, message)=>{
        if(sucess){
          console.warn("Success Initializing Spotify")
        } else {
          console.warn(message)
        }
      }
    );
  }

  componentWillMount() {
    this.initializeSpotify()
  }

  startLogIn() {
    SpotifyModule.loggedIn((res) => {
      console.warn(res)
      if(!res) {
        console.warn("Not logged in, starting process")
        SpotifyModule.startAuthenticationFlow((error) => {
          if(!error){
            console.warn('Signed in alright')
          } else {
            console.warn('Error signing in: ' + error)
          }
        });
      } else {
        console.warn('Already signed in')
        // _this.props.navigator.replace({
        //   component: logInSuccess,
        //   title: 'Success'
        // });
      }
    })
  }

  render() {
    _this = this;
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.button} onPress={this.startLogIn}>
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
