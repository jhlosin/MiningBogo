// Imports
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import _ from 'lodash'

// App Imports
import CoinCard from './CoinCard'
import supportedCoins from '../../config/supportedCoins'
// Style

// Component
export default class CoinCardContainer extends React.Component {
  render() {
    const { allBalances, hashrateData, coinPrice, navigation } = this.props
    const allBalancesData = allBalances.data || []
    return (
      <View>
        {
          _.map(supportedCoins, (supportedCoin) => {
            return allBalancesData.map((coinData) => {
              const coinHashData = hashrateData.find((item) => item.coin === coinData.coin) || {}
              const thisCoinPrice = coinPrice.find((coin) => coin.name === coinData.coin) || {}
              if(coinData.coin === supportedCoin.name) {
                return <CoinCard
                        key={coinData.coin}
                        hashStandard={supportedCoin.hashStandard}
                        coinData={coinData}
                        coinPrice={thisCoinPrice.data}
                        hashData={coinHashData.data}
                        hashDivisionValue={supportedCoin.hashDivisionValue}
                        symbol={supportedCoin.symbol}
                        navigation={navigation}
                      />
              }
            })
          })
        }
      </View>
    )
  }
}

CoinCardContainer.defaultProps = {
  allBalances: {},
  hashrateData: [],
  coinPrice: []
}

CoinCardContainer.propTypes = {
  allBalances: PropTypes.object,
  hashrateData: PropTypes.array,
  coinPrice: PropTypes.array,
}
