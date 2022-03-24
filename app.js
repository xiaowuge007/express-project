/*
 * @Author: lhq
 * @Date: 2022-03-22 14:17:41
 * @LastEditors: lhq
 * @LastEditTime: 2022-03-23 17:54:13
 * @Description: file content
 */
const express = require('express')

const errorHandle = require('./middleware/errorHandle')
const notFoundHandle = require('./middleware/404')
const auth = require('./middleware/auth')
const { prefix } = require('./config')

const indexRouter = require('./router')

const app = express()
// 内置中间件
app.use(express.json())

// 权限
app.use(auth)

// 路由
app.use(prefix, indexRouter)

// 404处理
app.use(notFoundHandle)

// 服务器错误处理
app.use(errorHandle)

app.listen('3000', () => {
  console.log('http://localhost:3000')
})
