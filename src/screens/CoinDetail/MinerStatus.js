// Import
import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, StyleSheet } from 'react-native'
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
    fontWeight: '700',
  },
  loading: {
    color: coinDetailViewTextColor,
    fontSize: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listHeader: {
  }
})

// Component
const MinerStatus = ({ workserData, coinInfo }) => {
  return(
    <Content padder>
      { workserData.length ? (
        <List
          dataArray={workserData}
          renderSectionHeader={() => (
            <ListItem >
              <Left>
                <Text style={styles.leftTextHeader}>마이너</Text>
              </Left>
              <Body>
                <Text style={styles.bodyTextHeader}>해시</Text>
              </Body>
            </ListItem>
          )}
          renderRow={(item) => {
            const dotIndex = item.username.indexOf('.')
            const minerName = (item.username).substring(dotIndex + 1)
            return (
              <ListItem>
                <Left>
                  <Text style={styles.text}>{minerName}</Text>
                </Left>
                <Body>
                  <Text style={styles.bodyText}>{(item.hashrate / coinInfo.hashDivisionValue).toFixed(1)} {coinInfo.hashStandard}</Text>
                </Body>
              </ListItem>
            )
          }
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

MinerStatus.propTypes = {
  workserData: PropTypes.array,
  coinInfo: PropTypes.object
}

MinerStatus.defaultProps = {
  workserData: [],
  coinInfo: {}
}

export default MinerStatus
