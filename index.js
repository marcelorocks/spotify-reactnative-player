import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './app/screens/HomeScreen';
import LaunchScreen from './app/screens/LaunchScreen';
import LoginScreen from './app/screens/LoginScreen';


export const MosaicPlayer = StackNavigator(
  {
    Launch: { screen: LaunchScreen },
    Login: { screen: LoginScreen },
    Home: { screen: HomeScreen }
  },
  {
    headerMode: 'none',
    mode: 'modal',
  }
);

AppRegistry.registerComponent('MosaicPlayer', () => MosaicPlayer);
