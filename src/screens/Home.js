// Imports
import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types'
import { Container } from 'native-base'

// App Imports
import { getUserHashrate } from '../module/mph.js'
import CoinCard from './CoinCard'
import Error from '../components/Error'
import * as MiningBogoActions from '../actions/miningBogo';
import { getUserAllBalances } from '../module/mph'
import { headerIconsColor } from '../config/colorTheme'

// Style
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
  icon: {
    fontSize: 24,
    marginRight: 10,
    color: headerIconsColor
  },
  nav: {
    flexDirection: 'row'
  }
});

@connect(
  state => state,
  dispatch => bindActionCreators(MiningBogoActions, dispatch)
)


// Component
export default class Home extends React.Component {
  componentDidMount() {
    this.props.navigation.setParams({ onPressRefresh: this.onPressRefresh })

    // get api token from local stroage
    Expo.SecureStore.getItemAsync('MiningBogoMphApi').then((apiKey) => {
      if (apiKey) { // if exist
        // ger mph user all balance
        getUserAllBalances(apiKey, (result) => { // check if the api key is valid
          if (result !== 'error') {

            // save the key if valid
            this.props.saveMphApiKey(apiKey)

            // save allUserBalance to redux store
            this.props.saveUserAllBalances(result)

            result.data.map((item) => {
              // get coin hashrate
              getUserHashrate(item.coin, apiKey, (hashResult) => {
                if (hashResult !== 'error') {
                  this.props.saveUserHashrate({
                    coin: item.coin,
                    data: hashResult
                  })
                }
              })
            })
          }
        })

      }
    })
  }
  onPressRefresh = () => {
    // handle refresh button
    console.log('onPressRefresh')
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'MiningBogo',
      headerRight: (
        <View style={styles.nav}>
          <FontAwesome
            name="refresh"
            style={styles.icon}
            onPress={navigation.getParam('onPressRefresh')}
          />
          <FontAwesome
            name="gear"
            style={styles.icon}
            onPress={() => navigation.navigate('SettingsModal', {
              title: 'Settings'
            })}
          />
      </View>
      )
    }
  }
  render() {
    const { apiKey } = this.props.miningBogo
    const { userAllBalances, userHashrate } = this.props.miningBogo
    return (
      <Container style={styles.container}>
        { apiKey ? (
          <CoinCard allBalances={userAllBalances} hashrateData={userHashrate} />
        ) : (
          <Error message="Add mining pool hub api key first" />
        ) }
      </Container>
    )
  }
}

Home.defaultProps = {
  miningBogo: {apiKey: 'dummyKey', userAllBalances: {}, userHashrate: []},
}

Home.propTypes = {
  miningBogo: PropTypes.object,
}
