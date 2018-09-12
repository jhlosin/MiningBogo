// Imports
import _ from 'lodash'

// Initial State
const initialState = {apiKey: '', coinPrice: [], userHashrate: [], userAllBalances: {}};

// Reducers
const actionsMap = {
  saveMphApiKey(state, action) {
    return {
      ...state,
      apiKey: action.payload
    }
  },
  saveSelectedCoin(state, action) {
    return {
      ...state,
      selectedCoin: action.payload
    }
  },
  saveUserAllBalances(state, action) {
    return {
      ...state,
      userAllBalances: action.payload
    }
  },
  saveUserHashrate(state, action) {
    let { userHashrate } = state
    const coinName = action.payload.coin
    const coinFoundInDex = _.findIndex(userHashrate, (item) => item.coin === coinName)

    if(coinFoundInDex !== -1) {
      // update
      userHashrate[coinFoundInDex] = action.payload
    } else {
      // push
      userHashrate.push(action.payload)
    }

    return {
      ...state,
      userHashrate
    }
  },
  savePriceInfo(state, action) {
    let { coinPrice } = state
    const coinName = action.payload.name
    const coinFoundInDex = _.findIndex(coinPrice, (item) => item.name === coinName)

    if(coinFoundInDex !== -1) {
      // update
      coinPrice[coinFoundInDex] = action.payload
    } else {
      // push
      coinPrice.push(action.payload)
    }

    return {
      ...state,
      coinPrice
    }
  }
};

export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
