const express = require('express')
const router = express.Router()

const checkLogin = require('../middlewares/check').checkLogin
const CommentModel = require('../models/comments')

const getResponse = require('../middlewares/getResponse').getResponse

// POST /api/comments/add 创建一条留言
router.post('/add', checkLogin, function (req, res, next) {
  const author = req.session.user._id
  const postId = req.fields.postId
  const content = req.fields.content

  const comment = {
    author: author,
    postId: postId,
    content: content
  }

  CommentModel.create(comment)
    .then(function() {
      CommentModel.getComments(postId)
        .then(function(comments) {
          res.send(getResponse(comments))
        })
    })
    .catch(next)
})

// POST /api/comments/delete 删除一条留言
router.post('/delete', checkLogin, function (req, res, next) {
  const commentId = req.fields.commentId
  const postId = req.fields.postId
  const author = req.session.user._id

  CommentModel.getCommentById(commentId)
    .then(function(comment) {
      if(!comment) {
        res.send(getResponse(null, 200, 'error', '评论不存在'))
      }
      if(comment.author.toString() !== author.toString()) {
        res.send(getResponse(null, 200, 'error', '没有权限'))
      }
      CommentModel.delCommentById(commentId)
        .then(function() {
          CommentModel.getComments(postId)
            .then(function(comments) {
              res.send(getResponse(comments))
            })
        })
        .catch(next)
    })
})

module.exports = router
