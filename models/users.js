const User = require('../lib/mongo').User

module.exports = {
    // 注册一个用户
    create: function create (user) {
        return User.create(user).exec()
    },

    // 通过用户名获取用户信息
    getUserByName: function getUserByName(name) {
        return User
            .findOne({ name: name })
            .addCreatedAt()
            .exec()
    },

    // 通过用户名更新用户信息
    updateUserByName: function updateUserByName(name, data) {
        return User.update({ _id: name._id }, { $set: data }).exec()
    }
}
