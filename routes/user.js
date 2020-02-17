const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check').checkLogin

const userModel = require('../models/users')
const getResponse = require('../middlewares/getResponse').getResponse

// /api/user/get 获取当前用户的基本信息
router.get('/get', checkLogin, function( req, res, next ) {
  const user = req.session.user
  userModel.getUserByName(user.name)
  .then(result => {
    res.send(getResponse(result, 200, 'success', ''))
  })
  .catch(next)
})

// POST /api/user/update 用户信息管理
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
