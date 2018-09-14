// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Text, Content, Tab, Tabs } from 'native-base'
import { StyleSheet } from 'react-native'

// App Imports
import * as MiningBogoActions from '../../actions/miningBogo';
import { getDashboardData, getUserWorkers } from '../../module/mph'
import supportedCoins from '../../config/supportedCoins'
import DailyMiningStatus from './DailyMiningStatus'
import MinerStatus from './MinerStatus'

// redux connect
@connect(
  state => state,
  dispatch => bindActionCreators(MiningBogoActions, dispatch)
)

// component
export default class CoinDetail extends React.Component {
  componentDidMount() {
    this._fetchDashboardData()
    this._fetchUserWorksers()
  }

  _fetchDashboardData = () => {
    const { apiKey } = this.props.miningBogo
    supportedCoins.map((coin) => {
      getDashboardData(coin.name, apiKey, (result) => {
        this.props.saveDashboardData({
          name: coin.name,
          symbol: coin.symbol,
          data: result.data
        })
      })
    })
  }

  _fetchUserWorksers = () => {
    const { apiKey } = this.props.miningBogo
    supportedCoins.map((coin) => {
      getUserWorkers(coin.name, apiKey, (result) => {
        this.props.saveUserWorkers({
          name: coin.name,
          symbol: coin.symbol,
          data: result.data
        })
      })
    })
  }

  render() {
    const { dashboardData, selectedCoin, userWorkers } = this.props.miningBogo
    const dashboardDataFortheSelectedCoin = dashboardData.find((item) => item.name === selectedCoin.coin) || {data: {}}
    const workerDataFortheSelectedCoin = userWorkers.find(item => item.name === selectedCoin.coin) || {data: {}}
    const dailyMiningData = dashboardDataFortheSelectedCoin.data.recent_credits || []

    const selectedCoinInfo = supportedCoins.find(item => item.name === selectedCoin.coin) || 'MH/s'

    return (
      <Container>
        <Tabs>
          <Tab heading="일별 채굴량">
            <DailyMiningStatus
              dailyMiningData={dailyMiningData}
              symbol={dashboardDataFortheSelectedCoin.symbol}
            />
          </Tab>
          <Tab heading="마이너">
            <MinerStatus
              coinInfo={selectedCoinInfo}
              workserData={workerDataFortheSelectedCoin.data}
            />
          </Tab>
        </Tabs>
      </Container>
    )
  }
}

CoinDetail.propTypes = {
  selectedCoin: PropTypes.object,
  dashboardData: PropTypes.object
}

CoinDetail.defaultProps = {
  selectedCoin: {},
  dashboardData: {}
}
