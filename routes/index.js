const fs = require('fs')
module.exports = function(app){
  app.get('*', function(req, res){
    if('/'==req.path){
      res.render('index', {title:'Express',cover:{}})
    }else{
      fs.exists('./views'+req.path+'.html',(ex) => {
        if(ex){
          let path = req.path
          path = path.slice(1,path.length)
          res.render(path, {title:'moban', error: 'Something blew up!' });
        }else{
          res.status(500).send({ error: 'Something blew up!' });
        }
      })
      
    }
  })
  /*app.get('/', function(req, res){
    res.render('index', {title:'Express',cover:{}})
  })
  app.get('/search', function(req, res){
    res.render('index', {title:'Express',cover:{}})
  })
  app.get('/async', function(req, res){
    res.render('index', {title:'Express',cover:{}})
  })
  app.get('/login', function(req, res){
    res.render('login', {title:'Express',cover:{}})
  })
  app.get('/register', function(req, res){
    res.render('register', {title:'Express',cover:{}})
  })*/
};
