// Import
import React from 'react'
import PropTypes from 'prop-types'
import { Text, StyleSheet } from 'react-native'
import { Content, List, ListItem, Left, Body, Container } from 'native-base'

// App Import
import { coinDetailViewTitleColor, coinDetailViewTextColor } from '../../config/colorTheme'

// Styles
const styles = StyleSheet.create({
  text: {
    color: coinDetailViewTextColor
  },
  leftTextHeader: {
    color: coinDetailViewTextColor,
    fontWeight: '700'
  },
  bodyText: {
    color: coinDetailViewTextColor,
    fontSize: 12,
    textAlign: 'center'
  },
  bodyTextHeader: {
    color: coinDetailViewTextColor,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '700'
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

// Component
const DailyMiningStatus = ({ dailyMiningData, symbol }) => {
  return(
    <Content padder>
      { dailyMiningData.length ? (
        <List dataArray={dailyMiningData}
          renderSectionHeader={() => (
            <ListItem >
              <Left>
                <Text style={styles.leftTextHeader}>날짜</Text>
              </Left>
              <Body>
                <Text style={styles.bodyTextHeader}>채굴량</Text>
              </Body>
            </ListItem>
          )}
          renderRow={(item) =>
            <ListItem>
              <Left>
                <Text style={styles.text}>{item.date}</Text>
              </Left>
              <Body>
                <Text style={styles.bodyText}>{(item.amount).toFixed(3)} {symbol}</Text>
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
  )
}

DailyMiningStatus.propTypes = {
  dailyMiningData: PropTypes.array,
  symbol: PropTypes.string,
}

DailyMiningStatus.defaultProps = {
  dailyMiningData: [],
  symbol: '',
}

export default DailyMiningStatus
