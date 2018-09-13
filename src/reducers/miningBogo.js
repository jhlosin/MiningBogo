// Imports
import _ from 'lodash'

// Initial State
const initialState = {apiKey: '', coinPrice: [], userHashrate: [], userAllBalances: {}, dashboardData: []};

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
    const coinFoundIndex = _.findIndex(userHashrate, (item) => item.coin === coinName)

    if(coinFoundIndex !== -1) {
      // update
      userHashrate[coinFoundIndex] = action.payload
    } else {
      // push
      userHashrate.push(action.payload)
    }

    return {
      ...state,
      userHashrate
    }
  },
  saveDashboardData(state, action) {
    let { dashboardData } = state
    const coinName = action.payload.name
    const coinFoundIndex = _.findIndex(dashboardData, (item) => item.name === coinName)

    if(coinFoundIndex !== -1) {
      // update
      dashboardData[coinFoundIndex] = action.payload
    } else {
      // push
      dashboardData.push(action.payload)
    }

    return {
      ...state,
      dashboardData
    }
  },
  savePriceInfo(state, action) {
    let { coinPrice } = state
    const coinName = action.payload.name
    const coinFoundIndex = _.findIndex(coinPrice, (item) => item.name === coinName)

    if(coinFoundIndex !== -1) {
      // update
      coinPrice[coinFoundIndex] = action.payload
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
