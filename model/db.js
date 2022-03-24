/*
 * @Author: lhq
 * @Date: 2022-03-22 16:42:11
 * @LastEditors: lhq
 * @LastEditTime: 2022-03-23 11:22:05
 * @Description: file content
 */
const mongoose = require('mongoose')
const User = require('./user')
const { dbUrl } = require('../config')

// 连接数据库
mongoose.connect(dbUrl)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('数据库连接成功')
})

module.exports = {
  User
}
