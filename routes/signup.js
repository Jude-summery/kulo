const fs = require('fs')
const path = require('path')
const sha1 = require('sha1')
const express = require('express')
const router = express.Router()

const UserModel = require('../models/users')
const checkNotLogin = require('../middlewares/check').checkNotLogin
const checkLogin = require('../middlewares/check').checkLogin

// POST /api/signup 用户注册
router.post('/', checkNotLogin, function (req, res, next) {
  let { name, password, confirm } = req.fields
  const response = {
    data: null,
    status: 200,
    statusText: 'success',
    message: ''
  }
  // 明文密码加密
  password = sha1(password)
  // 待写入数据库的用户信息
  let user = {
    name: name,
    password: password,
    email: null,
    nickname: null,
    signature: null,
    title: null
  }

  //用户信息写入数据库
  UserModel.create(user)
    .then(function (result) {
      // 此 user 是插入 mongodb 后的值，包含 _id
      user = result.ops[0]
      // 删除密码这种敏感信息，将用户信息存入 session
      delete user.password
      req.session.user = user
      res.cookie('USER', user.name)
      res.send(response)
    })
    .catch(function (e) {
      if (e.message.match('duplicate key')) {
        response.statusText = 'error'
        response.message = '用户名已被占用'
        res.send(response)
      }
    })
})

// POST /api/signup/update 用户信息管理
router.post('/update', checkLogin, function (req, res, next) {
  let { email, nickname, signature, title } = req.fields
  const user = req.session.user
  const response = {
    data: null,
    status: 200,
    statusText: 'success',
    message: ''
  }
  
  // 待写入数据库的用户信息
  let data = { email, nickname, signature, title }

  //用户信息写入数据库
  UserModel.updateUserByName(user, data)
    .then(function () {
      res.send(response)
    })
    .catch(next)
})

module.exports = router
