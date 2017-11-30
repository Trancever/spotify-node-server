const CryptoJS = require('crypto-js')
const keys = require('../config/keys')

module.exports = (req, res, next) => {
  if (req.user && req.user.accessToken) {
    req.accessToken = CryptoJS.AES.decrypt(
      req.user.accessToken,
      keys.CRYPT_KEY
    ).toString(CryptoJS.enc.Utf8)
  }
  console.log(req.accessToken)
  if (req.user && req.user.refreshToken) {
    req.refreshToken = CryptoJS.AES.decrypt(
      req.user.refreshToken,
      keys.CRYPT_KEY
    ).toString(CryptoJS.enc.Utf8)
  }

  next()
}
