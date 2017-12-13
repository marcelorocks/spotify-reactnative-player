import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  NativeModules
} from 'react-native';

var SpotifyModule = NativeModules.SpotifyModule;

var SPOTIFY_CLIENT_ID     = 'c15098f2925b4ccf99fa86defd4cbe3b'
var SPOTIFY_REDIRECT_URL  = 'mosaicplayer://callback'

export default class LaunchScreen extends Component <{}> {

  initializeSpotify() {
    SpotifyModule.initWithCredentials(SPOTIFY_CLIENT_ID,
      SPOTIFY_REDIRECT_URL,
      (sucess, message)=>{
        if(sucess){
          // console.warn("Success Initializing Spotify...")
        } else {
          console.error(message)
        }
      }
    );
  }

  componentWillMount() {
    this.initializeSpotify()

    const { navigate } = this.props.navigation;
    SpotifyModule.loggedIn((res) => {
      if(res) {
        navigate('Home')
      } else {
        navigate('Login')
      }
    })
  }

  render() {
     return (
       <View style={styles.container}>
         <View style={styles.buttonContainer}>
          <Text>MosaicPlayer</Text>
         </View>
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
