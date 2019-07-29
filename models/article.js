const mongoose = require('./mongoose')
// 定义Schema
var articleSchema = new mongoose.Schema({
  author: String,
  createtime: String,
  updatetime: String,
  type: String,
  label: String,
  title: String,
  keywords: String,
  content: String,
  text: String,
  delta: Object,
  pv: Number,
  rec: Boolean,
  smallpic: String,
  pic: String
}, {
  collection: 'articles'
})
// 存入数据库之前的操作
articleSchema.pre('save', function (next) {
  var date = new Date();
  if (this.isNew) {
    this.updatetime = this.createtime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  } else {
    this.updatetime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }
  next()
});
// 定义model，关联相关的表
var articleModel = mongoose.model('articles', articleSchema);

function findArticle(option, callback) {
  articleModel.find(option, function (err, result) {
    if (err) console.log(err);
    // 渲染模板
    var data = {
      Lists: result
    };

    callback(data)
  }).sort({'_id':1})
}

// 渲染文章列表
var renderArticleList = function (articleType, callback) {
  if(typeof articleType == 'string'){
    findArticle({type: articleType}, callback)
  }else if(typeof articleType == 'object'){
    findArticle(articleType, callback)
  }else{
    findArticle({}, callback)
  }
};

// 渲染文章详情
var renderArticle = function (articleId, callback) {
  var articleId = mongoose.mongo.ObjectId(articleId)
  articleModel.find({
    _id: articleId
  }, function (err, result) {
    if (err) console.log(err);

    callback(result[0])
  })
}

// 喜欢数增加
var addLike = function (req, res) {

}

// 文章管理列表分页获取数据
var renderManage = function (option={}, opt, callback) {
  var currentSize = (opt.currentPage - 1) * opt.pageSize;
  articleModel.find(option, function (err, result) {
    var data = {
      Lists: result
    };
    callback(result)
  }).skip(currentSize).limit(opt.pageSize)
}
// 文章管理列表获取总数
var getLength = function (option={}, callback) {
  articleModel.find(option, function (err, result) {
    callback(result.length)
  })
}

// 文章编辑保存
var saveArticle = function (params_id, article_opt, callback) {
  if (params_id) {
    var _id = mongoose.Types.ObjectId(params_id);
    console.log('mongo=', _id)
    articleModel.findOneAndUpdate({
      _id: _id
    }, article_opt, function (err, result) {
      callback(result._id)
    })
  } else {
    console.log(article_opt)
    var newArticle = new articleModel(article_opt);
    newArticle.save(function (err, result) {
      callback(result._id)
    })
  }
}

// 文章删除
var deleteArticle = function (articleId, callback) {
  articleModel.remove({
    _id: articleId
  }, function (err, result) {
    console.log(result)
    callback()
  })
}

var articles = {
  renderArticleList: renderArticleList,
  renderArticle: renderArticle,
  renderManage: renderManage,
  getLength: getLength,
  saveArticle: saveArticle,
  deleteArticle: deleteArticle
};

module.exports = articles;