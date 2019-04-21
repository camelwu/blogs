const fs = require('fs'),
  url = require('url'),
  setting = require('../settings'),
  tit = {
  "/": "首页",
  "login": "登录",
  "signup": "注册",
  "admin": "管理",
  "news": "媒体动态",
  "Recruitment": "诚聘英才",
  "service": "业务范围",
  "aboutus": "关于我们",
  "contactus": "联系我们",
}

// middleware
function checkLogin(req, res, next) {
  if (!req.session.user) {
    res.redirect('/')
  }
  next()
}
function checkNotLogin(req, res, next) {
  if (req.session.user) {
    res.redirect('back')
  }
  next()
}
// get访问
function front_get(req, res) {
  if ('/' == req.path) {
    res.render('index', { title: tit['/'], db: {} })
  } else {
    let uriAry = req.path.split('/'),
      path = uriAry[1],
      exists = fs.existsSync('./views/' + path + '.html');
    if (exists) {
      res.render(path, { title: tit[path], db: 'Something blew up!' })
    } else {
      res.redirect('/404')
    }
  }
}
function handle_get(req, res) {
  let path, uriAry = req.path.split('/'),
    uri = uriAry[1],
    exists = fs.existsSync('./views/' + uri + '.html');
  if (uriAry.length < 3) {
    path = 'admin/index'
    exists = fs.existsSync('./views/' + path + '.html')
  } else {
    path = uriAry[2] == '' ? 'admin/index' : 'admin/' + uriAry[2]
    exists = fs.existsSync('./views/' + path + '.html')
  }
  console.log(path)

  if (exists) {
    let status, result
    switch (path) {
      case 'article':

        break;
      case 'company':

        break;
      case 'reg':

        break;
      default:
        break;
    }
    res.render(path, { title: tit[path], setting: setting, error: 'Something blew up!' })
  } else {
    res.status(404).send({ error: '404!' });
  }
}
// post请求
function handle_post(req, res) {
  const key = req.path,
    mime = "application/json;charset=utf-8",
    body = req.body
  let status, result
  switch (key) {
    case 'article':

      break;
    case 'company':

      break;
    case 'reg':

      break;
    default:
      break;
  }
  res.writeHead(200, { "Content-Type": mime });
  // res.render('index', { title: 'Express', cover: {} })
}
// delete请求
function handle_delete(req, res) {
  res.render('index', { title: 'Express', cover: {} })
}
// put请求
function handle_put(req, res) {
  res.render('login', { title: 'Express', cover: {} })
}

module.exports = function (app) {
  // 正则，前台和管理区分
  app.get('/' + setting.manage + '(/*)?', [handle_get])
  app.get('/*', front_get)
  // 
  app.post('*', [checkLogin, handle_post])
  // 
  app.put('*', [checkLogin, handle_put])
  // 
  app.delete('*', [checkLogin, handle_delete])
};
