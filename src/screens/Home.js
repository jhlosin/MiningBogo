// Imports
import React from 'react'
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native'
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
import CoinPriceInfo from './CoinPriceInfo'

// dev Import
import { resetLocalStorage } from '../utils'

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
    // resetLocalStorage() // for dev purpose
    this.props.navigation.setParams({ onPressRefresh: this.onPressRefresh, isFetching: false})

    this._fetchData()
  }
  _fetchData = () => {
    // get api token from local stroage
    Expo.SecureStore.getItemAsync('MiningBogoMphApi').then((apiKey) => {
      if (apiKey) { // if exist
        this.props.navigation.setParams({ isFetching:true })
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
    const { userAllBalances, userHashrate, coinPrice, apiKey } = this.props.miningBogo
    return (
      <Container style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={() => this._fetchData()}
              refreshing={this.props.navigation.getParam('isFetching') || false}
            />
          }
        >
        <CoinPriceInfo coinPrice={coinPrice} />
        { apiKey ? (
            <CoinCard navigation={this.props.navigation} coinPrice={coinPrice} allBalances={userAllBalances} hashrateData={userHashrate} />

        ) : (
          <Error message1="마풀허 API key 정보가 없거나 바르지 않습니다." message2="등록 후 새로고침 해주세요." />
        ) }
        </ScrollView>
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
