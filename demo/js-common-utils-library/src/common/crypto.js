var CryptoJS = require("crypto-js")

let key = 'yearrow'

function encrypt (info) {
  let infoTxt = CryptoJS.AES.encrypt(info, key)
  return infoTxt.toString()
}

function decrypt (info) {
  let bytes = CryptoJS.AES.decrypt(info, key)
  return bytes.toString(CryptoJS.enc.Utf8)
}

module.exports = {
  encrypt,
  decrypt
}
