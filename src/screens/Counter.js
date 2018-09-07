// Imports
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// App Imports
import * as CounterActions from '../actions/counter';

// Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  title: {
    fontSize: 30,
  }
});

// redux connect
@connect(
  state => state,
  dispatch => bindActionCreators(CounterActions, dispatch)
)

// Component
export default class Counter extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'default title')
    }
  }

  // Define Proptypes
  static propTypes = {
    incrementAsync: PropTypes.func.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    incrementIfOdd: PropTypes.func.isRequired,
    counter: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    const { incrementAsync } = props;
    this.incrementAsync = () => incrementAsync();
  }

  render() {
    const { increment, decrement, incrementIfOdd, counter } = this.props;
    const title = this.props.navigation.getParam('title', 'default title')
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>Clicked: {counter} times</Text>
        <TouchableHighlight onPress={increment}>
          <Text style={styles.text}>+</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={decrement}>
          <Text style={styles.text}>-</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={incrementIfOdd}>
          <Text style={styles.text}>Increment if odd</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.incrementAsync}>
          <Text style={styles.text}>Increment async</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
