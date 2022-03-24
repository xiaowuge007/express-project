/*
 * @Author: lhq
 * @Date: 2022-03-24 15:58:52
 * @LastEditors: lhq
 * @LastEditTime: 2022-03-24 17:52:33
 * @Description: file content
 */
const rimraf = require('rimraf')
const { promisify } = require('util')
const path = require('path')
const del = promisify(rimraf)

const getlist = () => {
  return [
    // controller 控制器
    {
      type: 'add',
      path: 'controller/{{name}}.js',
      templateFile: 'plop-templates/controller.hbs'
    },
    // model 数据模型
    {
      type: 'add',
      path: 'model/{{name}}.js',
      templateFile: 'plop-templates/model.hbs'
    },
    // validator 验证
    {
      type: 'add',
      path: 'validator/{{name}}.js',
      templateFile: 'plop-templates/validator.hbs'
    },
    // router 路由
    {
      type: 'add',
      path: 'router/{{name}}.js',
      templateFile: 'plop-templates/router.hbs'
    }
  ]
}

module.exports = function (plop) {
  // 添加删除操作
  plop.setActionType('del', async function (answers, config, plop) {
    const file = config.path.replace(/\{\{(.*?)\}\}/g, function (word) {
      const key = word.replace(/\{|\}/g, '')
      return answers[key] || word
    })
    try {
      await del(path.join(__dirname, file))
      return file
    } catch (err) {
      return Promise.reject(err)
    }
  })
  // create your generators here
  plop.setGenerator('create', {
    description: 'create a router',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'router name please'
    }],
    actions: getlist()
  })

  plop.setGenerator('remove', {
    description: 'del a router',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'router name please'
    }],
    actions: getlist().map(item => {
      item.type = 'del'
      return item
    })
  })
}
