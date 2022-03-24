/*
 * @Author: lhq
 * @Date: 2022-03-22 16:40:31
 * @LastEditors: lhq
 * @LastEditTime: 2022-03-23 16:44:04
 * @Description: file content
 */
const { User } = require('../model/db')
const encrypt = require('../util/md5')
const { createToken } = require('../util/token')
exports.index = (req, res, next) => {
  try {
    res.status(200).send({
      msg: 'hello'

    })
  } catch (err) {
    next(err)
  }
}
exports.login = async (req, res, next) => {
  try {
    const user = req.user.toJSON()
    delete user.password
    user.token = await createToken({ id: user._id })
    res.status(200).json({
      user
    })
  } catch (err) {
    next(err)
  }
}
exports.register = async (req, res, next) => {
  console.log(req.body)
  try {
    let user = new User(req.body.user)
    user.password = encrypt(user.password)
    // console.log(user.toJson)
    await user.save()
    user = JSON.parse(JSON.stringify(user))
    // 删除password
    delete user.password

    res.status(200).send({
      user
    })
  } catch (err) {
    next(err)
  }
}
