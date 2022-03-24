/*
 * @Author: lhq
 * @Date: 2022-03-24 10:03:51
 * @LastEditors: lhq
 * @LastEditTime: 2022-03-24 15:54:08
 * @Description: file content
 */
const { body } = require('express-validator')
// const { Article } = require('../model/db')
const { validateAll } = require('../middleware/validate')
const { validateId } = require('../validator/common')
const Article = require('../model/article')

exports.addArticle = validateAll([
  body('article.title').notEmpty().withMessage('文章标题不能为空'),
  body('article.body').notEmpty().withMessage('文章内容不能为空'),
  body('article.description').notEmpty().withMessage('文章简介不能为空')
])

exports.getArticle = validateId

exports.updateArticle = [
  validateId,
  async (req, res, next) => {
    const id = req.params.id
    const article = await Article.findById(id)
    if (!article) {
      return res.status(404).end()
    }
    req.article = article
    next()
  },
  // 判断当前用户是否为创建者
  async (req, res, next) => {
    if (req.user.userId.toString() !== req.article.author.toString()) {
      return res.status(403).end()
    }
    next()
  }
]
exports.delArticle = exports.updateArticle
