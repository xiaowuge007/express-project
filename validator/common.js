/*
 * @Author: lhq
 * @Date: 2022-03-24 15:09:16
 * @LastEditors: lhq
 * @LastEditTime: 2022-03-24 18:28:19
 * @Description: file content
 */
const { param } = require('express-validator')
// const { Article } = require('../model/db')
const { validateAll } = require('../middleware/validate')
const { isValidObjectId } = require('mongoose')

exports.validateId = validateAll([
  param('id').custom(async value => {
    if (!isValidObjectId(value)) {
      return Promise.reject(new Error('id 格式错误'))
    }
  })
])
