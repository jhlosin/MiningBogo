// Imports
import React from 'react'
import { View, Text, StyleSheet, AsyncStorage } from 'react-native'
import { Button } from 'native-base'
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container } from 'native-base'

// App Imports
import * as MiningBogo from '../actions/miningBogo';
import { textColor } from '../config/colorTheme'

// Style
const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  textFieldContainer: {
    marginBottom: 20,
  },
  buttonText: {
    color: textColor,
    fontSize: 15,
  }
})

// redux connect
@connect(
  state => state,
  dispatch => bindActionCreators(MiningBogo, dispatch)
)

// Component
export default class SettingsModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      apiKey: ''
    }
  }
  static navigationOptions = ({ navigation }) => ({
    title: 'Settings'
  })
  componentDidMount() {
    Expo.SecureStore.getItemAsync('MiningBogoMphApi').then((data) => {
      if (data) this.setState({ apiKey: data })
    })
  }
  onPressSave = async () => {
    // save the data to android local storage
    await Expo.SecureStore.setItemAsync('MiningBogoMphApi', this.state.apiKey)

    // save to the redux store
    this.props.saveMphApiKey(this.state.apiKey)

    // go back to home view
    this.props.navigation.goBack()
  }
  render() {
    let { apiKey } = this.state
    return (
      <Container style={styles.container}>
        <TextField
          containerStyle={styles.textFieldContainer}
          multiline
          label="Mining Pool Hub API Key"
          onChangeText={(apiKey) => this.setState({apiKey})}
          value={apiKey}
        />
        <Button block primary onPress={this.onPressSave}>
            <Text style={styles.buttonText}>SAVE</Text>
        </Button>
    </Container>
    );
  }
}
