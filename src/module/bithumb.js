// Imports
import axios from 'axios'

const getCoinKorPrice = async (coinName, cb) => {
  https://api.korbit.co.kr/v1/ticker/detailed?currency_pair=eth_krw
  const url = 'https://api.bithumb.com/public/ticker/' + coinName
  try {
    const res = await axios.get(url)
    cb(res.data)
  } catch (err) {
    cb('error', err)
  }
}

export {
  getCoinKorPrice,
}
