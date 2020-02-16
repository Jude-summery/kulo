const sha1 = require('sha1')
const express = require('express')
const router = express.Router()

const UserModel = require('../models/users')
const checkNotLogin = require('../middlewares/check').checkNotLogin
const getResponse = require('../middlewares/getResponse').getResponse

// GET /api/signin 登录页
router.get('/', checkNotLogin, function (req, res, next) {
  res.render('signin')
})

// POST /api/signin 用户登录
router.post('/', checkNotLogin, function (req, res, next) {
  const name = req.fields.name
  const password = req.fields.password

  // 校验参数
  try {
    if(!name.length) {
      throw new Error('请填写用户名')
    }
    if(!password.length) {
      throw new Error('请填写密码')
    }
  } catch (e) {
    return res.send(getResponse(null,401,'error',e.message))
  }

  UserModel.getUserByName(name)
    .then(function(user) {
      if(!user) {
        return res.send(getResponse(null,401,'error','用户不存在'))
      }
      // 检查密码是否匹配
      if(sha1(password) !== user.password) {
        return res.send(getResponse(null,401,'error','用户名或密码错误'))
      }
      // 用户信息写入 session
      delete user.password
      req.session.user = user
      res.cookie('USER', user.name)
      res.send(getResponse(null,200,'success','登录成功'))
    })
    .catch(next)
})

module.exports = router
