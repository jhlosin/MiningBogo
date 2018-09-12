// Imports
import React from 'react'
import { StyleSheet, View, Dimensions, RefreshControl, TouchableHighlight } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Header, Content, Card, CardItem, Text, Body } from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { COLOR } from 'react-native-material-ui';

// App Imports
import { getUserHashrate } from '../../module/mph'
import * as MiningBogoActions from '../../actions/miningBogo';
import { cardBackgroundColor, hashRateFontColor } from '../../config/colorTheme'

// Style
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    backgroundColor: cardBackgroundColor
  },
  hashrate: {
    color: hashRateFontColor,
    fontSize: 30,
    fontWeight: '600'
  },
  hashrateTitle: {
    fontSize: 15,
    fontWeight: '600'
  },
  hashrateStandard: {
    fontSize: 12,
    fontWeight: '600'
  }
})

@connect(
  state => state,
  dispatch => bindActionCreators(MiningBogoActions, dispatch)
)

// Component
export default class CoinCard extends React.Component {
  onPressCard = () => {
    this.props.navigation.navigate('CoinDetail')
    this.props.saveSelectedCoin(this.props.coinData)
  }
  render() {
    const { coinData, hashData, hashStandard, hashDivisionValue, symbol, coinPrice, navigation } = this.props
    const coinName = (coinData.coin).toUpperCase()
    const hashDataData = hashData.data
    const estimatedProfit = (coinPrice.buy_price * coinData.confirmed).toFixed(0)
    return (
      <Content padder style={styles.container} >
        <TouchableHighlight underlayColor={cardBackgroundColor} onPress={this.onPressCard}>
          <Card>
            <CardItem header bordered>
              <Text>{coinName}</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Grid>
                  <Col>
                    <Row>
                      <Text style={styles.hashrateTitle}>
                        해시량
                      </Text>
                    </Row>
                    <Row>
                      <Text style={styles.hashrateStandard}>
                        ( {hashStandard} )
                      </Text>
                    </Row>
                  </Col>
                  <Col>
                    <Text style={styles.hashrate}>
                      {(hashDataData / hashDivisionValue).toFixed(2)}
                    </Text>
                  </Col>
                </Grid>

              </Body>
            </CardItem>
            <CardItem footer bordered>
              <Col>
                <Text>잔고: {(coinData.confirmed).toFixed(3)} {symbol}</Text>
              </Col>
              <Col>
                <Text>예상수익: {estimatedProfit} 원</Text>
              </Col>
            </CardItem>
          </Card>
        </TouchableHighlight>
      </Content>
    )
  }
}

CoinCard.defaultProps = {
  coinData: {}, hashData: {data: 0}, hashStandard: 'MH/s', hashDivisionValue: 1000000,
  symbol: "ETH", coinPrice: {}
}

CoinCard.propTypes = {
  coinData: PropTypes.object,
  hashData: PropTypes.object,
  coinPrice: PropTypes.object,
  hashStandard: PropTypes.string,
  hashDivisionValue: PropTypes.number,
  symbol: PropTypes.string,
  saveSelectedCoin: PropTypes.func
}
