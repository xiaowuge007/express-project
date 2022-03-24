/*
 * @Author: lhq
 * @Date: 2022-03-23 15:08:34
 * @LastEditors: lhq
 * @LastEditTime: 2022-03-23 15:19:00
 * @Description: file content
 */
const crypto = require('crypto')
const { passwordKey } = require('../config')
// console.log(crypto.getHashes())
const encrypt = (str) => {
  const md5 = crypto.createHash('md5')
  const content = `password=${str}&key=${passwordKey}`
  md5.update(content)
  return md5.digest('hex')
}

module.exports = encrypt
