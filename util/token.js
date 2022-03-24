/*
 * @Author: lhq
 * @Date: 2022-03-23 16:30:01
 * @LastEditors: lhq
 * @LastEditTime: 2022-03-23 18:02:57
 * @Description: file content
 */
const { promisify } = require('util')
const jwt = require('jsonwebtoken')

const sign = promisify(jwt.sign)
const verify = promisify(jwt.verify)
const { tokenSecret } = require('../config')
const createToken = (obj, time) => {
  time = time || 60 * 60
  return sign(obj, tokenSecret, {
    expiresIn: time
  })
}

module.exports = {
  createToken,
  verify
}
