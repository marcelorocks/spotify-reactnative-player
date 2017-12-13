import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

export default class HomeScreen extends Component <{}> {

  onPressButton() {
    console.warn('Ok got it')
  }

  render() {
     return (
       <View style={styles.container}>
         <View style={styles.buttonContainer}>
           <Button
             onPress={this.onPressButton}
             title="Main Screen"
           />
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
