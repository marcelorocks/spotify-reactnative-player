import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import LaunchScreen from './LaunchScreen';
import HomeScreen from './HomeScreen';

export const MosaicPlayer = StackNavigator(
  {
    Launch: { screen: LaunchScreen },
    Home: { screen: HomeScreen }
  },
  {
    headerMode: 'none',
    mode: 'modal',    
  }
);

AppRegistry.registerComponent('MosaicPlayer', () => MosaicPlayer);
