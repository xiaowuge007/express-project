/*
 * @Author: lhq
 * @Date: 2022-03-24 09:24:04
 * @LastEditors: lhq
 * @LastEditTime: 2022-03-24 18:06:49
 * @Description: file content
 */
const { Schema, model } = require('mongoose')
const base = require('./base')
const articleSchema = Schema({
  ...base,
  slug: {
    type: String,
    default: null
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tagList: {
    type: [String]
  },
  body: {
    type: String,
    required: true
  },
  favorited: {
    type: Boolean,
    default: null
  },
  favoritesCount: {
    type: Number,
    default: 0
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

const Article = model('Article', articleSchema)

module.exports = Article
