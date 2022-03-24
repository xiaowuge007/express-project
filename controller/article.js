/*
 * @Author: lhq
 * @Date: 2022-03-24 09:24:04
 * @LastEditors: lhq
 * @LastEditTime: 2022-03-24 16:44:08
 * @Description: file content
 */
const { Article, User } = require('../model/db')
exports.getArticles = async (req, res, next) => {
  try {
    const {
      limit = 10,
      offset = 0,
      tag,
      author
    } = req.query
    const query = {}
    if (tag) {
      query.tagList = tag
    }
    if (author) {
      const user = await User.findOne({ username: author })
      console.log(user)
      query.author = user ? user._id : null
    }
    const articles = await Article.find(query)
      .skip(Number(offset))
      .limit(Number(limit))
      .populate('author')
    const articlesCount = await Article.count(query)
    res.status(200).json({
      articles,
      articlesCount
    })
  } catch (err) {
    next(err)
  }
}

exports.getArticle = async (req, res, next) => {
  try {
    const id = req.params.slug
    const article = await Article.findOne({ _id: id })
      .populate('author')
    res.status(200).json({
      article
    })
  } catch (err) {
    next(err)
  }
}

exports.addArticle = async (req, res, next) => {
  try {
    const article = new Article(req.body.article)
    article.author = req.user.userId
    await article.populate('author')
    await article.save()
    res.status(200).json({
      article
    })
  } catch (err) {
    next(err)
  }
}

exports.updateArticle = async (req, res, next) => {
  try {
    const article = req.article
    const clientArticle = req.body.article
    article.title = clientArticle.title || article.title
    article.description = clientArticle.description || article.description
    article.body = clientArticle.body || article.body
    await article.save()
    await article.populate('author')
    res.status(200).json({
      article
    })
  } catch (err) {
    next(err)
  }
}

exports.delArticle = async (req, res, next) => {
  try {
    const id = req.params.id
    await Article.deleteOne({ _id: id })
    res.status(200).json({
      code: 1,
      msg: '删除成功'
    })
  } catch (err) {
    next(err)
  }
}
