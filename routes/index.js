
const allowCrossDomain = function (req, res, next){
  res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials','true');
  next()
}

module.exports = function(app) {
    app.use(allowCrossDomain)
    app.get('/api/currentUser', function(req, res){
        res.send({
            name: 'xiazz',
            avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
            userid: '00000001',
            email: 'antdesign@alipay.com',
            signature: '海纳百川，有容乃大',
            title: '交互专家',
            group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
            tags: [
              {
                key: '0',
                label: '很有想法的',
              },
              {
                key: '1',
                label: '专注设计',
              },
              {
                key: '2',
                label: '辣~',
              },
              {
                key: '3',
                label: '大长腿',
              },
              {
                key: '4',
                label: '川妹子',
              },
              {
                key: '5',
                label: '海纳百川',
              },
            ],
            notice: [
              {
                id: 'xxx1',
                title: 'Alipay',
                logo: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
                description: '那是一种内在的东西，他们到达不了，也无法触及的',
                updatedAt: new Date(),
                member: '科学搬砖组',
                href: '',
                memberLink: '',
              },
            ],
            notifyCount: 12,
            unreadCount: 11,
            country: 'China',
            geographic: {
              province: {
                label: '浙江省',
                key: '330000',
              },
              city: {
                label: '杭州市',
                key: '330100',
              },
            },
            address: '西湖区工专路 77 号',
            phone: '0752-268888888',
          })
    })
    app.use('/api/signup', require('./signup'))
    app.use('/api/signin', require('./signin'))
    app.use('/api/signout', require('./signout'))
    app.use('/api/posts', require('./posts'))
    app.use('/api/comments', require('./comments'))

    // 404 page
    app.use(function(req, res) {
        if(!res.headersSent) {
            res.status(404).render('404')
        }
    })
}
