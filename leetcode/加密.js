const CryptoJS = require('crypto-js')
const encrypt = (word) => {
  let key = CryptoJS.enc.Utf8.parse("46cc793c53dc451b");
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}
/**
 * 解密
 */
const decrypt = (word) => {
  let key = CryptoJS.enc.Utf8.parse("46cc793c53dc451b");
  let decrypt = CryptoJS.AES.decrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}

let parsedWordArray = CryptoJS.enc.Base64.parse(base64);
let parsedStr = parsedWordArray.toString(CryptoJS.enc.Utf8);
console.log("parsed:",parsedStr);
console.log(encrypt('hello'))