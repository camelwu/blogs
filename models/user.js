const crypto = require('crypto')
const mongoose = require('./mongoose')
const UserSchema = new mongoose.Schema({
  "username": String,
  "password": String,
  "email": String,
  "isSuper": Boolean
}, {
  collection: 'users'
})
const userModel = mongoose.model('User', UserSchema)

function findUser(option, callback) {
  userModel.find(option, function (err, result) {
    if (err) return callback(err);
    // 渲染模板
    var data = {
      userLists: result
    };

    callback(data)
  })
}

// 渲染用户列表
var renderUserList = function (userType, callback) {
  switch (userType) {
    case 'all':
      findUser({}, callback)
      break;
    case 'super':
      findUser({
        isSuper: true
      }, callback)
      break;
    default:
      findUser({
        isSuper: false
      }, callback)
  }
};

// 渲染用户详情
var renderUser = function (userId, callback) {
  var userId = mongoose.mongo.ObjectId(userId)
  userModel.find({
    _id: userId
  }, function (err, result) {
    if (err) return callback(err);

    callback(result[0])
  })
}

// 用户管理列表分页获取数据
var renderManage = function (opt, callback) {
  var currentSize = (opt.currentPage - 1) * opt.pageSize;
  userModel.find({}, function (err, result) {
    var data = {
      userLists: result
    };
    callback(result)
  }).skip(currentSize).limit(opt.pageSize)
}
// 用户管理列表获取总数
var getLength = function (callback) {
  userModel.find({}, function (err, result) {
    callback(result.length)
  })
}

// 用户编辑保存
var saveUser = function (user_opt, callback) {

  if (user_opt.params_id) {
    var _id = user_opt.params_id
    userModel.findOneAndUpdate({
      _id: _id
    }, user_opt, function (err, result) {
      callback(result._id)
    })
  } else {
    userModel.create(user_opt, function (err, result) {
      if (err) {
        return callback(err)
      }
      callback(result)
    })
  }
}

// 用户删除
var deleteUser = function (userId, callback) {
  userModel.remove({
    _id: userId
  }, function (err, result) {
    console.log(result)
    callback()
  })
}

var User = {
  renderUserList: renderUserList,
  renderUser: renderUser,
  renderManage: renderManage,
  getLength: getLength,
  findUser: findUser,
  saveUser: saveUser,
  deleteUser: deleteUser
};

module.exports = User