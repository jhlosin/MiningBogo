// imports
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'native-base'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const Error = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{ message }</Text>
    </View>
  )
}

export default Error
