// Imports
import React from 'react'
import { createStackNavigator } from 'react-navigation';
import { YellowBox } from 'react-native';
// App Imports
import HomeScreen from './screens/Home'
import SettingsModal from './screens/SettingsModal'
import CoinDetail from './screens/CoinDetail'
import { headerBg, headerTitleColor, headerTintColor } from './config/colorTheme'
import LoadingScreen from './components/LoadingScreen'

// ignore warning from remote debugger
YellowBox.ignoreWarnings(['Remote debugger']);

const RootStack = createStackNavigator({
  Home: HomeScreen,
  SettingsModal: SettingsModal,
  CoinDetail: CoinDetail,
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
  state = {
    loaded: false
  }
  loading = (cb) => {
    setTimeout(cb, 4000)
  }

  // load native base custom fonts http://docs.nativebase.io/docs/GetStarted.html
  async componentWillMount() {
    this.loading(() => this.setState({loaded: true}))

    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }
  render() {
    if (this.state.loaded) {
      return <RootStack />
    } else {
      return <LoadingScreen />
    }
  }
}
