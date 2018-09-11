// Imports
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types'
import { Container, Button, Icon, Text, Grid, Col } from 'native-base'
import * as Animatable from 'react-native-animatable';

// App Imports
import { getUserHashrate } from '../module/mph.js'
import CoinCard from './CoinCard'
import Error from '../components/Error'
import * as MiningBogoActions from '../actions/miningBogo';
import { getUserAllBalances } from '../module/mph'
import { getCoinKorPrice } from '../module/bithumb'
import { headerIconsColor } from '../config/colorTheme'
import supportedCoins from '../config/supportedCoins'

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
    this.props.navigation.setParams({ onPressRefresh: this.onPressRefresh, isFetching: false})

    this._fetchData()
  }
  _fetchData = () => {
    this.props.navigation.setParams({ isFetching:true })

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
                this.props.navigation.setParams({ isFetching:false })
              })
            })
          }
        })

      }
    })

    // get currency price info
    this._fetchCoinPrice()

  }
  _fetchCoinPrice = () => {
    supportedCoins.map((coin) => {
      getCoinKorPrice(coin.symbol, (result) => {
        this.props.savePriceInfo({
          name: coin.name,
          data: result.data
        })
      })
    })
  }
  onPressRefresh = () => {
    // handle refresh button
    this._fetchData()
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'MiningBogo',
      headerRight: (
        <View style={styles.nav}>
          <Button style={styles.icon} transparent primary onPress={navigation.getParam('onPressRefresh')}>
            {
              navigation.getParam('isFetching') ? (
                <Animatable.View animation="rotate" easing="linear" iterationCount="infinite" duration={800}>
                  <Icon name='refresh' />
                </Animatable.View>
              ) : (
                <Icon name='refresh' />
              )
            }
          </Button>
          <Button style={styles.icon} transparent primary onPress={() => navigation.navigate('SettingsModal')}>
            <Icon name='settings' />
          </Button>
        </View>
      )
    }
  }
  render() {
    const { apiKey } = this.props.miningBogo
    const { userAllBalances, userHashrate, coinPrice } = this.props.miningBogo
    return (
      <Container style={styles.container}>
        { apiKey ? (
          <CoinCard coinPrice={coinPrice} allBalances={userAllBalances} hashrateData={userHashrate} />
        ) : (
          <Error message="Mining pool hub api key is missing or invalid" />
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
