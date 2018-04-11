const fs = require('fs')
const url = require('url')
const tit = {
  "/": "首页",
  "blog": "博客",
  "login": "登录",
  "regist": "注册",
  "chat": "聊天"
}
// get访问
function handle_get(req, res){
  
}
// post请求
function handle_post(req, res){
  res.render('index', {title:'Express',cover:{}})
}
// delete请求
function handle_delete(req, res){
  res.render('index', {title:'Express',cover:{}})
}
// put请求
function handle_put(req, res){
  res.render('login', {title:'Express',cover:{}})
}

module.exports = function(app){
  app.get('*', function(req, res){
    console.log({path: req.path, baseUrl: req.baseUrl, originalUrl: req.originalUrl, url: req.url});
    if('/'==req.path){
      res.render('index', {title:'Express',cover:{}})
    }else{
      let exists = fs.existsSync('./views'+req.path+'.html')
      let path = url.parse(req.originalUrl).pathname
      
      path = path.slice(1,path.length)
      if(exists){
        res.render(path, {title:tit[path], error: 'Something blew up!' })
      }else{
        let test = new RegExp();
        res.status(404).send({ error: 'no file!' });
      }
    }
  })
  app.post('*', handle_post)
  app.put('*', handle_put)
  app.delete('*', handle_delete)
};
