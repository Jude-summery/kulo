const express = require('express')
const router = express.Router()

const checkLogin = require('../middlewares/check').checkLogin
const getResponse = require('../middlewares/getResponse').getResponse

// GET /api/signout 登出
router.get('/', checkLogin, function (req, res, next) {
  // 清空session中的用户信息
  // req.session.user = null
  req.session.destroy(function(err) { /*销毁session*/
		console.log(err);
	});
  res.clearCookie('USER')
  // 登出成功后跳转到主页
  res.send(getResponse(null, 200, 'success', '退出登录成功'))
})

module.exports = router
