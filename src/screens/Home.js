// Imports
import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'

// Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

// Component
export default class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerRight: (
      <Button
        onPress={() => alert('This is the info you are looking!')}
        title="Info"
      />
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>HOME</Text>
        <Button
          title="Go to Counter"
          onPress={() => this.props.navigation.navigate('Counter', {
            title: 'Counter'
          })}
        />
        <Button
          title="FullScreen Modal"
          onPress={() => this.props.navigation.navigate('Modal', {
            title: 'Counter'
          })}
        />
      </View>
    )
  }
}
