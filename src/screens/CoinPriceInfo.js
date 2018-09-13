// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Dimensions } from 'react-native'
import { Container, Text, Card, CardItem, Header, Content, Body, Icon } from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid';

// App Imports
import { coinPriceInfoBgColor } from '../config/colorTheme'
import { numberWithCommas } from '../utils'

// Styles
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
  },
  columnBox: {
    backgroundColor: coinPriceInfoBgColor,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  }
})

// Components
const CoinPriceInfo = ({ coinPrice }) => {
  const coinToDisplay = [
    {name: 'bitcoin', symbol: 'BTC'},
    {name: 'ethereum', symbol: 'ETH'},
    {name: 'zcash', symbol: 'ZEC'},
    {name: 'monero', symbol: 'XMR'},
  ]

  return (
    <View  style={styles.container} >
      <Grid>
          {coinToDisplay.map((coin, index) => {
            const thisCoinPriceInfo = coinPrice.find((priceInfo) => priceInfo.name === coin.name) || {data: {buy_price: '0'}}
            const averagePrice = thisCoinPriceInfo.data.buy_price * 1
            return (
              <Col key={index} style={styles.columnBox}>
                <Row>
                  <Text style={styles.text}>
                    {coin.symbol}
                  </Text>
                </Row>
                <Row>
                  <Text style={styles.text}>
                    {numberWithCommas(averagePrice.toFixed(0))}원
                  </Text>
                </Row>

              </Col>
            )
          })}
      </Grid>
    </View>
  )
}

CoinPriceInfo.defaultProps = {
  coinPrice: [
    {name: 'bitcoin', data: {}},
    {name: 'ethereum', data: {}},
    {name: 'zcash', data: {}},
    {name: 'monero', data: {}},
  ]
}

CoinPriceInfo.propTypes = {
  coinPrice: PropTypes.array.isRequired,
}

export default CoinPriceInfo
