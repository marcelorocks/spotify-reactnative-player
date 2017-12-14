import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  NativeModules,
  NativeEventEmitter,
  SectionList,
  TouchableHighlight
} from 'react-native';

var SpotifyModule = NativeModules.SpotifyModule;
var _accessToken = '';
var _this;

export default class HomeScreen extends Component <{}> {

  constructor(props) {
    super(props);
    this.playLists = [{'title': 'Select Your Playlist', data: []}]
  }

  render() {
    _this = this;

    return (
     <View style={styles.container}>
       <SectionList
         sections={this.playLists}
         renderItem={({item}) => <Button title={item['name']} onPress={() => {
           console.warn('Playing: ' + item['name'])
           SpotifyModule.authenticatePlayerForPlaylist(item['uri'])
         }}/>}
         renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
         keyExtractor={(item, index) => index}
       />
       <Button title="Load Lists" onPress={() => {
         SpotifyModule.accessToken((token) => {
           fetch('https://api.spotify.com/v1/me', {method: 'GET', headers: {'Authorization': 'Bearer ' + token}})
           .then(response => response.json())
           .then(responseJson => {
             fetch('https://api.spotify.com/v1/users/'+responseJson.id+'/playlists', {method: 'GET', headers: {'Authorization': 'Bearer ' + token}})
             .then(response => response.json())
             .then(responseJson => {
               for(i in responseJson.items) {
                 _this.playLists[0].data[i] = {name: responseJson.items[i].name, uri: responseJson.items[i].uri}
               }
               _this.setState({playLists: _this.playLists})
             }).catch(error => {
               console.error(error);
             })
           }).catch(error => {
             console.error(error);
           });
         })         
       }}/>
     </View>
    );
   }
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  sectionHeader: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    fontSize: 20,
    height: 60,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 80,
  },
})
