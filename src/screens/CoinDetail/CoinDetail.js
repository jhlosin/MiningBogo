// Imports
import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Text, Content, List, ListItem, Body, Right, Left, Thumbnail, Button } from 'native-base'
import { StyleSheet } from 'react-native'

// App Imports
import * as MiningBogoActions from '../../actions/miningBogo';
import { coinDetailViewTitleColor } from '../../config/colorTheme'

// Styles
const styles = StyleSheet.create({
  title: {
    color: coinDetailViewTitleColor,
    fontWeight: '800'
  },
})

const dailyMiningData = [
  {date: '2018-10-01', minedCoin: 10.35, symbol: 'ETH'},
  {date: '2018-10-02', minedCoin: 9.93, symbol: 'ETH'},
  {date: '2018-10-03', minedCoin: 10.21, symbol: 'ETH'},
  {date: '2018-10-04', minedCoin: 10.32, symbol: 'ETH'},
  {date: '2018-10-05', minedCoin: 10.25, symbol: 'ETH'},
  {date: '2018-10-06', minedCoin: 10.55, symbol: 'ETH'},
  {date: '2018-10-07', minedCoin: 10.97, symbol: 'ETH'},
  {date: '2018-10-08', minedCoin: 11.12, symbol: 'ETH'},
  {date: '2018-10-09', minedCoin: 12.30, symbol: 'ETH'},
  {date: '2018-10-10', minedCoin: 11.12, symbol: 'ETH'},
  {date: '2018-10-11', minedCoin: 10.12, symbol: 'ETH'},
  {date: '2018-10-12', minedCoin: 10.32, symbol: 'ETH'},
  {date: '2018-10-13', minedCoin: 10.01, symbol: 'ETH'},
  {date: '2018-10-14', minedCoin: 9.9, symbol: 'ETH'},
]

// redux connect
@connect(
  state => state,
  dispatch => bindActionCreators({}, dispatch)
)

// component
export default class CoinDetail extends React.Component {
  render() {
    const { selectedCoin } = this.props
    return (
      <Container>
        <Content padder>
          <Text style={styles.title}>일별 채굴량</Text>
          <List dataArray={dailyMiningData}
            renderRow={(item) =>
              <ListItem>
                <Left>
                  <Text style={{color: 'black'}}>{item.date}</Text>
                </Left>
                <Body>
                  <Text style={{color: 'black'}}>{item.minedCoin} {item.symbol}</Text>
                </Body>
              </ListItem>
            }>
          </List>
        </Content>
      </Container>
    )
  }
}
