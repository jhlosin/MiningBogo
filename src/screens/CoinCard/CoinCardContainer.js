// Imports
import React from 'react'
import { ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import _ from 'lodash'

// App Imports
import CoinCard from './CoinCard'
import supportedCoins from '../../config/supportedCoins'
// Style

// Component
const CoinCardContainer = ({ allBalances, hashrateData }) => {
  const allBalancesData = allBalances.data || []
  return (
    <ScrollView>
      {
        _.map(supportedCoins, (supportedCoin) => {
          return allBalancesData.map((coinData) => {
            const coinHashData = hashrateData.find((item) => item.coin === coinData.coin) || []
            if(coinData.coin === supportedCoin.name) {
              return <CoinCard
                      key={coinData.coin}
                      hashStandard={supportedCoin.hashStandard}
                      coinData={coinData}
                      hashData={coinHashData.data}
                      hashDivisionValue={supportedCoin.hashDivisionValue}
                    />
            }
          })
        })
      }
    </ScrollView>
  )
}

CoinCardContainer.defaultProps = {
  allBalances: {},
  hashrateData: []
}

CoinCardContainer.propTypes = {
  allBalances: PropTypes.object,
  hashrateData: PropTypes.array,
}

export default CoinCardContainer
