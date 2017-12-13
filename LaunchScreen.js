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

export default class LaunchScreen extends Component<{}> {

  static navigationOptions = {
    header: {
       visible: false,
    }
  }

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
