const config = require('config-lite')(__dirname)

const allowCrossDomain = function (req, res, next) {
	res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Credentials', 'true');
	next()
}

module.exports = function (app) {
	app.use(allowCrossDomain)
	app.use('/api/signup', require('./signup'))
	app.use('/api/signin', require('./signin'))
	app.use('/api/signout', require('./signout'))
	app.use('/api/posts', require('./posts'))
	app.use('/api/comments', require('./comments'))
	app.use('/api/user', require('./user'))

	// 404 page
	app.use(function (req, res) {
		if (!res.headersSent) {
			res.status(404).send('404 Not Found')
		}
	})

  // 全局catch
  app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })
}
