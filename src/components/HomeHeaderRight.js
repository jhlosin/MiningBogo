// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View} from 'react-native'
import { Button, Icon } from 'native-base'
import * as Animatable from 'react-native-animatable';

// App Imports
import { headerIconsColor } from '../config/colorTheme'


// Styles
const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row'
  },
  icon: {
    color: headerIconsColor
  },
  logo: {
    height: 60,
    width: 150,
  }
});

// Component
const HomeHeaderRight = ({ navigation }) => {
  return (
    <View style={styles.nav}>
      <Button transparent primary onPress={navigation.getParam('onPressRefresh')}>
        {
          navigation.getParam('isFetching') ? (
            <Animatable.View animation="rotate" easing="linear" iterationCount="infinite" duration={800}>
              <Icon style={styles.icon} name='refresh' />
            </Animatable.View>
          ) : (
            <Icon style={styles.icon} name='refresh' />
          )
        }
      </Button>
      <Button transparent primary onPress={() => navigation.navigate('SettingsModal')}>
        <Icon style={styles.icon} name='settings' />
      </Button>
    </View>
  )
}

HomeHeaderRight.propTypes = {
  navigation: PropTypes.object
}

export default HomeHeaderRight
