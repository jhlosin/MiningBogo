// Imports
import React from 'react'
import { createStackNavigator } from 'react-navigation';

// App Imports
import HomeScreen from './screens/Home'
import CounterScreen from './screens/Counter'
import ModalScreen from './screens/ModalScreen'

const MainStack = createStackNavigator({
  Home: HomeScreen,
  Counter: CounterScreen
},
{
  initialRouteName: "Home",
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
}
)

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    Modal: {
      screen: ModalScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
)

export default class App extends React.Component {
  render() {
    return <RootStack />
  }
}
