const express = require('express')
const router = express.Router()
const PostModel = require('../models/posts')
const CommentModel = require('../models/comments')

const checkLogin = require('../middlewares/check').checkLogin
const getResponse = require('../middlewares/getResponse').getResponse

// GET /api/posts 所有用户或者特定用户的文章页
// eg: GET /api/posts
router.get('/', checkLogin, function (req, res, next) {
    const author = req.session.user._id

    PostModel.getPosts(author)
        .then(function (posts) {
            const response = getResponse(posts)
            res.send(response)
        })
        .catch(next)
})

// POST /api/posts/create 发表一篇文章
router.post('/create', checkLogin, function (req, res, next) {
    const author = req.session.user._id
    const title = req.fields.title
    const content = req.fields.content

    let post = {
        author: author,
        title: title,
        content: content
    }

    PostModel.create(post).then(function(result) {
        // 此 post 是插入 mongodb 后的值，包含 _id
        post = result.ops[0]
        res.send(getResponse(null))
    })
    .catch(next)
})

// GET /api/posts/getOne单独一篇的文章
router.get('/getOne', function (req, res, next) {
    const postId = req.query.postId

    Promise.all([
        PostModel.getPostById(postId), // 获取文章信息
        CommentModel.getComments(postId), // 获取该文章所有留言
        PostModel.incPv(postId) // pv 加 1
    ])
        .then(function(result) {
            const post = result[0]
            const comments = result[1]
            if(!post) {
                res.send(getResponse(null))
            } else {
                res.send(getResponse({
                    post: post,
                    comments, comments
                }))
            }
        })
        .catch(next)
})

// POST /api/posts/edit 更新一篇文章
router.post('/edit', checkLogin, function (req, res, next) {
    const postId = req.fields.postId
    const author = req.session.user._id
    const title = req.fields.title
    const content = req.fields.content

    // 校验参数
    try {
        if(!title.length) {
            throw new Error('请填写标题')
        }
        if(!content.length) {
            throw new Error('请填写内容')
        }
    } catch(e) {
        throw e
    }

    PostModel.getRawPostById(postId)
        .then(function(post) {
            if(post.author._id.toString() !== author.toString()) {
                throw new Error('没有权限')
            }
            PostModel.updatePostById(postId, { title: title, content: content })
                .then(function() {
                    res.send(getResponse(null))
                })
                .catch(next)
        })

})

// GET /aip/posts/remove 删除一篇文章
router.post('/remove', checkLogin, function (req, res, next) {
    const postId = req.fields.postId
    const author = req.session.user._id

    PostModel.getRawPostById(postId)
        .then(function (post) {
            if(!post) {
                throw new Error('文章不存在')
            }
            if(post.author._id.toString() !== author.toString()) {
                throw new Error('没有权限')
            }
            PostModel.delPostById(postId, author)
                .then(function(){
                    res.send(getResponse(null))
                })
                .catch(next)
        })
})

module.exports = router
