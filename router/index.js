/*
 * @Author: lhq
 * @Date: 2022-03-22 15:42:29
 * @LastEditors: lhq
 * @LastEditTime: 2022-03-23 16:21:26
 * @Description: file content
 */
const express = require('express')

const router = express.Router()
const ctr = require('../controller/index')
const vdt = require('../validator/user')

// 首页
router.get('/', ctr.index)

// 注册
router.post('/register', vdt.register, ctr.register)

// 登录
router.post('/login', vdt.login, ctr.login)

module.exports = router
