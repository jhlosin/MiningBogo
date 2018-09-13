// Import
import React from 'react'
import { Container } from 'native-base'
import { StyleSheet, Image } from 'react-native'

// App Imports
import { loadingScreenBgColor } from '../config/colorTheme'

const styles = StyleSheet.create({
  container: {
    backgroundColor: loadingScreenBgColor,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    height: 100,
    width: 300,
  }
})

export default class LoadingScreen extends React.Component {
  render() {
    return(
      <Container style={styles.container}>
        <Image style={styles.logo} source={require('../assets/logo_mainPage.png')} />
      </Container>
    )
  }
}
