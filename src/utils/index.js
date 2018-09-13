export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const resetLocalStorage = async () => {
  await Expo.SecureStore.deleteItemAsync('MiningBogoMphApi')
}

export const getTimeStampedUrl = (url) => {
  return url + '&' + new Date().getTime()
}
