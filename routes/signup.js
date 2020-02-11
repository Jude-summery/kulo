const fs = require('fs')
const path = require('path')
const sha1 = require('sha1')
const express = require('express')
const router = express.Router()

const UserModel = require('../models/users')
const checkNotLogin = require('../middlewares/check').checkNotLogin

// POST /api/signup 用户注册
router.post('/', function (req, res, next) {
  let { name, password, confirm } = req.fields
  const result = {
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
    password: password
  }
  result.statusText = 'error'
  result.message = '用户名已被占用'
  res.send(result)
  //用户信息写入数据库
  // UserModel.create(user)
  //   .then(function (result) {
  //     // 此 user 是插入 mongodb 后的值，包含 _id
  //     user = result.ops[0]
  //     // 删除密码这种敏感信息，将用户信息存入 session
  //     delete user.password
  //     req.session.user = user
  //   })
  //   .catch(function (e) {
  //     if (e.message.match('duplicate key')) {
  //       result.statusText = 'error'
  //       result.message = '用户名已被占用'
  //     }
  //   })
  //   .then(() => {
  //     res.send(result)
  //   })
})

module.exports = router
