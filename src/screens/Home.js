// Imports
import React from 'react'
import { StyleSheet, View, ScrollView, RefreshControl, Image, ToastAndroid } from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types'
import { Container, Button, Icon, Text, Grid, Col, Toast } from 'native-base'
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
import HomeHeaderRight from '../components/HomeHeaderRight'
import { getMphApiKeyFromLocalStorage } from '../utils'

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
  logo: {
    height: 60,
    width: 150,
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
    getMphApiKeyFromLocalStorage(apiKey => {
      if (apiKey) {
        this.props.navigation.setParams({ isFetching:true })
        this._fetchMphHomeData(apiKey)
      }
    })
    // get currency price info(bithumb)
    this._fetchCoinPrice()

  }
  _fetchMphHomeData = (apiKey) => {
    // ger mph user all balance
    getUserAllBalances(apiKey, (result) => { // check if the api key is valid
      if (result === 'error') {
        this.props.navigation.setParams({ isFetching:false })
        ToastAndroid.show('마풀허 API키를 확인해 주세요.', ToastAndroid.SHORT);
        return console.log('error getting userAllBalances')
      }
      // save the key if valid
      this.props.saveMphApiKey(apiKey)

      // save allUserBalance to redux store
      this.props.saveUserAllBalances(result)

      result.data.map((item) => {
        // get coin hashrate
        getUserHashrate(item.coin, apiKey, (hashResult) => {
          if (result === 'error') {
            this.props.navigation.setParams({ isFetching:false })
            ToastAndroid.show('마풀허 API키를 확인해 주세요.', ToastAndroid.SHORT);
            return console.log('error getting userHashrate')
          }
          this.props.saveUserHashrate({
            coin: item.coin,
            data: hashResult
          })
          this.props.navigation.setParams({ isFetching:false })
        })
      })
    })
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
    // render the screenagain
    this.forceUpdate()

    // fetch data
    this._fetchData()
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <Image style={styles.logo} source={require('../assets/logo_small1.png')} />
      ),
      headerRight: <HomeHeaderRight navigation={navigation} />
    }
  }
  render() {
    const { userAllBalances, userHashrate, coinPrice, apiKey } = this.props.miningBogo
    const isFetching = this.props.navigation.getParam('isFetching')
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
          { apiKey ? <CoinCard navigation={this.props.navigation} coinPrice={coinPrice} allBalances={userAllBalances} hashrateData={userHashrate} /> : null}
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
