/*
 * @Author: lhq
 * @Date: 2022-03-22 16:59:12
 * @LastEditors: lhq
 * @LastEditTime: 2022-03-23 11:24:36
 * @Description: file content
 */
const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  img: {
    type: String,
    default: null
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  updateDate: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
