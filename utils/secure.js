const CryptoJS = require('crypto-js')
const config = require('../config/application')

async function encryptedAes (data) {
  try {
    let encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), CryptoJS.enc.Utf8.parse(config.keyChiperService), {
      keySize: 256,
      iv: CryptoJS.enc.Utf8.parse(config.ivChipresService),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    return encrypted
  } catch (error) {
    return error
  }
}

async function decryptedAes (data) {
  try {
    let decrypted = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(config.keyChiperService), {
      keySize: 256,
      iv: CryptoJS.enc.Utf8.parse(config.ivChipresService),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    let responseB64 = Buffer.from(decrypted.toString(CryptoJS.enc.Utf8), 'base64')
    return responseB64.toString()
  } catch (error) {
    throw error
  }
}

function decryptedAesDefault (data) {
  try {
    const decrypted = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(config.keyChiperService), {
      keySize: 256,
      iv: CryptoJS.enc.Utf8.parse(config.ivChipresService),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    return decrypted.toString(CryptoJS.enc.Utf8)
  } catch (error) {
    throw error
  }
}

module.exports = {
  encryptedAes,
  decryptedAes,
  decryptedAesDefault
}
