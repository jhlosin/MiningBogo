// Imports
import axios from 'axios'

const getUserAllBalances = async (apiKey, cb) => {
  const url = 'https://miningpoolhub.com/index.php?page=api&action=getuserallbalances&api_key=' + apiKey
  try {
    const res = await axios.get(url)
    cb(res.data.getuserallbalances)
  } catch (err) {
    cb('error', err)
  }
}

const getUserHashrate = async (coin, apiKey, cb) => {
  const url = 'https://' + coin + '.miningpoolhub.com/index.php?page=api&action=getuserhashrate&api_key=' + apiKey
  try {
    const res = await axios.get(url)
    cb(res.data.getuserhashrate)
  } catch (err) {
    cb('error', err)
  }
}

const getUserWorkers = async (coin, apiKey, cb) => {
  const url = 'https://' + coin + '.miningpoolhub.com/index.php?page=api&action=getuserworkers&api_key=' + apiKey
  try {
    const res = await axios.get(url)
    cb(res.data.getuserworkers)
  } catch (err) {
    cb('error', err)
  }
}

const getUserTransactions = async (coin, apiKey, cb) => {
  const url = 'https://' + coin + '.miningpoolhub.com/index.php?page=api&action=getusertransactions&api_key=' + apiKey
  try {
    const res = await axios.get(url)
    cb(res.data.getusertransactions)
  } catch (err) {
    cb('error', err)
  }
}

// const verifyApiToken = (apiKey, cb) => {
//   getUserAllBalances(apiKey, (result) => cb(result))
// }

export {
  getUserHashrate,
  getUserAllBalances,
  getUserWorkers,
  getUserTransactions,
  // verifyApiToken
}
