/*
 * @Author: lhq
 * @Date: 2022-03-22 15:33:07
 * @LastEditors: lhq
 * @LastEditTime: 2022-03-22 16:31:24
 * @Description: file content
 */
const util = require('util')

const errorHandle = (err, req, res, next) => {
  if (err) {
    res.status(500).send({
      err: util.format(err)
    })
  }
}

module.exports = errorHandle
