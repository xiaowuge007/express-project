/*
 * @Author: lhq
 * @Date: 2022-03-24 09:24:04
 * @LastEditors: lhq
 * @LastEditTime: 2022-03-24 15:54:35
 * @Description: file content
 */
const express = require('express')
const router = express.Router()
const vdt = require('../validator/article')
const ctr = require('../controller/article')

// 获取文章列表
router.get('/articles', ctr.getArticles)

// 获取文章详情
router.get('/articles/:id', vdt.getArticle, ctr.getArticle)

// 创建文章
router.post('/articles', vdt.addArticle, ctr.addArticle)

// 更新文章
router.put('/articles/:id', vdt.updateArticle, ctr.updateArticle)

// 删除文章
router.delete('/articles/:id', vdt.delArticle, ctr.delArticle)

module.exports = router
