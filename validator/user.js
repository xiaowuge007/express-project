/*
 * @Author: lhq
 * @Date: 2022-03-23 11:28:26
 * @LastEditors: lhq
 * @LastEditTime: 2022-03-23 16:15:19
 * @Description: file content
 */
const { body, validationResult } = require('express-validator')
const { User } = require('../model/db')
const { validateAll } = require('../middleware/validate')
const encrypt = require('../util/md5')
exports.register = [
  body('user.username').notEmpty().withMessage('用户名不能为空')
    .custom(async (value) => {
      const user = await User.findOne({ username: value })
      if (user) {
        return Promise.reject(new Error('该用户已存在'))
      }
    }),
  body('user.password').notEmpty().withMessage('用户密码不能为空'),
  body('user.email').notEmpty().withMessage('邮箱不能为空')
    .isEmail().withMessage('邮箱格式不正确')
    .custom(async (value) => {
      const user = await User.findOne({ email: value })
      if (user) {
        return Promise.reject(new Error('该邮箱已被使用'))
      }
    }),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]
exports.login = [
  validateAll([
    body('user.email').notEmpty().withMessage('邮箱不能为空')
      .isEmail().withMessage('邮箱格式不正确'),
    body('user.password').notEmpty().withMessage('用户密码不能为空')
  ]),
  validateAll([
    body('user.email').custom(async (value, { req }) => {
      const user = await User.findOne({ email: value })
      if (!user) {
        return Promise.reject(new Error('该用户不存在'))
      }
      req.user = user
    })
  ]),
  validateAll([
    body('user.password').custom(async (value, { req }) => {
      if (encrypt(value) !== req.user.password) {
        return Promise.reject(new Error('密码不正确'))
      }
    })
  ])
]
