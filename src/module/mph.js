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

getUserAllBalances('710f50780ea967a32f0662dc8d2f01d8dcda34f2ae66c97ba421697c78cdc717', (result) => console.log(result))

export {
  getUserHashrate,
  getUserAllBalances,
  getUserWorkers,
  getUserTransactions,
  // verifyApiToken
}
