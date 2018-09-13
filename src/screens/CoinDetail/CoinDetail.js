// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Text, Content, List, ListItem, Body, Right, Left, Thumbnail, Button } from 'native-base'
import { StyleSheet } from 'react-native'

// App Imports
import * as MiningBogoActions from '../../actions/miningBogo';
import { coinDetailViewTitleColor, coinDetailViewTextColor } from '../../config/colorTheme'
import { getDashboardData } from '../../module/mph'
import supportedCoins from '../../config/supportedCoins'

// Styles
const styles = StyleSheet.create({
  title: {
    color: coinDetailViewTitleColor,
    fontWeight: '800'
  },
  text: {
    color: coinDetailViewTextColor
  },
  loading: {
    color: coinDetailViewTextColor,
    fontSize: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

// redux connect
@connect(
  state => state,
  dispatch => bindActionCreators(MiningBogoActions, dispatch)
)

// component
export default class CoinDetail extends React.Component {
  componentDidMount() {
    this._fetchDashboardData()
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

  render() {
    const { dashboardData, selectedCoin } = this.props.miningBogo
    const dashboardDataFortheSelectedCoin = dashboardData.find((item) => item.name === selectedCoin.coin) || {data: {}}
    const dailyMiningData = dashboardDataFortheSelectedCoin.data.recent_credits || []
    return (
      <Container>
        <Content padder>
          <Text style={styles.title}>일별 채굴량</Text>
          { dailyMiningData.length ? (
            <List dataArray={dailyMiningData}
              renderRow={(item) =>
                <ListItem>
                  <Left>
                    <Text style={styles.text}>{item.date}</Text>
                  </Left>
                  <Body>
                    <Text style={styles.text}>{(item.amount).toFixed(3)} {dashboardDataFortheSelectedCoin.symbol}</Text>
                  </Body>
                </ListItem>
              }>
            </List>
          ) : (
            <Container style={styles.loadingContainer}>
              <Text style={styles.loading}>데이터 로딩중...</Text>
            </Container>
          ) }

        </Content>
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
