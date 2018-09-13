// Imports
import axios from 'axios'

// App Imports
import { getTimeStampedUrl } from '../utils'

const getDashboardData = async (coin, apiKey, cb) => {
  const url = 'https://' + coin + '.miningpoolhub.com/index.php?page=api&action=getdashboarddata&api_key=' + apiKey
  try {
    // timestamp should be attacehd to avoid browser caching
    const res = await axios.get(getTimeStampedUrl(url))
    cb(res.data.getdashboarddata)
  } catch (err) {
    cb('error', err)
  }
}

const getUserAllBalances = async (apiKey, cb) => {
  const url = 'https://miningpoolhub.com/index.php?page=api&action=getuserallbalances&api_key=' + apiKey
  try {
    // timestamp should be attacehd to avoid browser caching
    const res = await axios.get(getTimeStampedUrl(url))
    cb(res.data.getuserallbalances)
  } catch (err) {
    cb('error', err)
  }
}

const getUserHashrate = async (coin, apiKey, cb) => {
  const url = 'https://' + coin + '.miningpoolhub.com/index.php?page=api&action=getuserhashrate&api_key=' + apiKey
  try {
    const res = await axios.get(getTimeStampedUrl(url))
    cb(res.data.getuserhashrate)
  } catch (err) {
    cb('error', err)
  }
}

const getUserWorkers = async (coin, apiKey, cb) => {
  const url = 'https://' + coin + '.miningpoolhub.com/index.php?page=api&action=getuserworkers&api_key=' + apiKey
  try {
    const res = await axios.get(getTimeStampedUrl(url))
    cb(res.data.getuserworkers)
  } catch (err) {
    cb('error', err)
  }
}

const getUserTransactions = async (coin, apiKey, cb) => {
  const url = 'https://' + coin + '.miningpoolhub.com/index.php?page=api&action=getusertransactions&api_key=' + apiKey
  try {
    const res = await axios.get(getTimeStampedUrl(url))
    cb(res.data.getusertransactions)
  } catch (err) {
    cb('error', err)
  }
}

export {
  getUserHashrate,
  getUserAllBalances,
  getUserWorkers,
  getUserTransactions,
  getDashboardData
}
