const fs = require('fs')

// get访问
function handle_get(req, res){
  if('/'==req.path){
    res.render('index', {title:'Express',cover:{}})
  }else{
    let exists = fs.existsSync('./views'+req.path+'.html')
    let path = req.path
        path = path.slice(1,path.length)
    if(exists){
      res.render(path, {title:'moban', error: 'Something blew up!' })
    }else{
      res.status(404).send({ error: 'no file!' });
    }
  }
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
  app.get('*', handle_get(app))
  app.post('*', handle_post(app))
  app.put('*', handle_put(app))
  app.delete('*', handle_delete(app))
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
};
