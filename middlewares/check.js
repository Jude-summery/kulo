const getResponse = require('./getResponse').getResponse

module.exports = {
    checkLogin: function checkLogin(req, res, next) {
        if(!req.session.user) {
            return res.send(getResponse(null, 401, 'error', '用户未登录'))
        }
        next()
    },

    checkNotLogin: function checkNotLogin(req, res, next) {
        if(req.session.user) {
            return res.send(getResponse(null, 402, 'error', '用户已登录'))
        }
        next()
    }
}