// Imports
import React from 'react'
import { StyleSheet, View, Dimensions, RefreshControl } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Header, Content, Card, CardItem, Text, Body } from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { COLOR } from 'react-native-material-ui';

// App Imports
import { getUserHashrate } from '../../module/mph'
import * as MiningBogoActions from '../../actions/miningBogo';
import { cardBackgroundColor } from '../../config/colorTheme'

// Style
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    backgroundColor: cardBackgroundColor
  },
  hashrate: {
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

// Component
const CoinCard = ({ coinData, hashData, hashStandard, hashDivisionValue }) => {
  const coinName = (coinData.coin).toUpperCase()
  const hashDataData = hashData.data
  return (
      <Content padder style={styles.container} >
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
                      Hashrate
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
            <Text>
              Balance: {(coinData.confirmed).toFixed(3)}
            </Text>
          </CardItem>
        </Card>
      </Content>
  )
}

CoinCard.defaultProps = {
  coinData: {}, hashData: {data: 0}, hashStandard: 'MH/s', hashDivisionValue: 1000000
}

CoinCard.propTypes = {
  coinData: PropTypes.object,
  hashData: PropTypes.object,
  hashStandard: PropTypes.string,
  hashDivisionValue: PropTypes.number
}

export default CoinCard
