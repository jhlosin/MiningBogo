// imports
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'native-base'

// App Imports
import { errMsgColor } from '../config/colorTheme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 10,
    color: errMsgColor
  },
});

const Error = ({ color, message1, message2 }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{ message1 }</Text>
      { message2 && (
        <Text style={styles.text}>{ message2 }</Text>
      ) }
    </View>
  )
}

export default Error
