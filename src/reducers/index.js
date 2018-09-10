import { combineReducers } from 'redux';
import counter from './counter';
import miningBogo from './miningBogo'

export default combineReducers({
  counter,
  miningBogo,
});
