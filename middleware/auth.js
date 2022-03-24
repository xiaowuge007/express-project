/*
 * @Author: lhq
 * @Date: 2022-03-23 16:47:22
 * @LastEditors: lhq
 * @LastEditTime: 2022-03-23 18:06:15
 * @Description: file content
 */
const authIgnoreConfig = require('../config/auth.ignore.config')
const { tokenSecret } = require('../config')
const { verify } = require('../util/token')
const { TokenExpiredError } = require('jsonwebtoken')
const { prefix } = require('../config')

module.exports = async (req, res, next) => {
  // 判断是否需要认证
  const url = req.url.replace(prefix, '')
  if (authIgnoreConfig.indexOf(url) > -1) {
    next()
    return
  }
  const token = req.headers.authorization ? req.headers.authorization.split('Bearer ')[1] : ''
  console.log(req.headers.authorization)
  if (!token) {
    return res.status(401).json({
      msg: '请先登录'
    })
  }
  try {
    const ret = await verify(token, tokenSecret)
    console.log(ret)
    next()
  } catch (err) {
    console.log()
    // token过期
    if (err instanceof TokenExpiredError) {
      return res.status(401).json({
        msg: 'token is expired'
      })
    }
    res.status(401).json({
      msg: 'invalid token'
    })
  }
}
