// Imports
import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Text } from 'native-base'

// App Imports
import * as MiningBogoActions from '../actions/miningBogo';

@connect(
  state => state,
  dispatch => bindActionCreators(MiningBogoActions, dispatch)
)

export default class CoinDetail extends React.Component {
  render() {
    const { selectedCoin } = this.props.miningBogo
    return (
      <Container>
        <Text>{selectedCoin.coin}</Text>
      </Container>
    )
  }
}
