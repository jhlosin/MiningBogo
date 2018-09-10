// Imports
import React from 'react'
import { createStackNavigator } from 'react-navigation';

// App Imports
import HomeScreen from './screens/Home'
import CounterScreen from './screens/Counter'
import SettingsModal from './screens/SettingsModal'
import { headerBg, headerTitleColor, headerTintColor } from './config/colorTheme'

const RootStack = createStackNavigator({
  Home: HomeScreen,
  Counter: CounterScreen,
  SettingsModal: SettingsModal,
},
{
  initialRouteName: "Home",
  navigationOptions: {
    headerStyle: {
      backgroundColor: headerBg,
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      color: headerTitleColor,
    },
    headerTintColor: headerTintColor
  }
}
)

export default class App extends React.Component {
  // load native base custom fonts http://docs.nativebase.io/docs/GetStarted.html
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }
  render() {
    return <RootStack />
  }
}
