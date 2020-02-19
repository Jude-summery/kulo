const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check').checkLogin
const path = require('path')

const UserModel = require('../models/users')
const getResponse = require('../middlewares/getResponse').getResponse

// /api/user/get 获取当前用户的基本信息
router.get('/get', checkLogin, function( req, res, next ) {
  const user = req.session.user
  UserModel.getUserByName(user.name)
  .then(result => {
    res.send(getResponse(result, 200, 'success', ''))
  })
  .catch(next)
})

// POST /api/user/update 用户信息管理
router.post('/update', checkLogin, function (req, res, next) {
  let { email, nickname, signature, title } = req.fields
  const avatar = req.files.avatar.path.split(path.sep).pop()
  const user = req.session.user
  const response = {
    data: null,
    status: 200,
    statusText: 'success',
    message: ''
  }
  
  // 待写入数据库的用户信息
  let data = { email, nickname, signature, title, avatar }

  //用户信息写入数据库
  UserModel.updateUserByName(user, data)
    .then(function () {
      res.send(response)
    })
    .catch(function (e) {
      // 注册失败，异步删除上传的头像
      fs.unlink(req.files.avatar.path)
      next(e)
    })
})

// POST /api/user/update/avatar 用户信息管理
router.post('/update/avatar', checkLogin, function (req, res, next) {
  const avatar = req.files.avatar.path.split(path.sep).pop()
  const user = req.session.user
  const response = {
    data: null,
    status: 200,
    statusText: 'success',
    message: ''
  }
  
  // 待写入数据库的用户信息
  let data = { avatar }

  //用户信息写入数据库
  UserModel.updateUserByName(user, data)
    .then(function () {
      res.send(response)
    })
    .catch(function (e) {
      // 注册失败，异步删除上传的头像
      fs.unlink(req.files.avatar.path)
      next(e)
    })
})

// GET /api/user/get/avatar 获取用户头像
router.get('/get/avatar', checkLogin, function (req, res, next) {
  const imgid = req.param('imgid')
  const file = path.join(__dirname, `../public/img/${imgid}`)
  res.download(file)
})

module.exports = router
