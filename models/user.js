const crypto = require('crypto')
const mongoose = require('./mongoose')
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    avtor: String,
    isSuper: Boolean
}, { collection: 'users' })
const userModel = mongoose.model('User', UserSchema)

function User(user){
    this.username = user.username
    this.password = user.password
    this.email = user.email
    this.avtor = user.avtor
    this.isSuper = user.isSuper
}
User.prototype.save = function(cb){
    const md5 = crypto.createHash('md5'),
    email_md5 = md5.update(this.email.toLowerCase()).digest('hex')

    var user = {
        username = this.username,
        password = this.password,
        email = this.email,
        avtor = this.avtor,
        isSuper = this.isSuper
    },
    // newUser.create
    newUser = new userModel(user)
    newUser.save(function(err,user){
        if(err){
            return cb(err)
        }
        cb(null,user)
    })
}
User.get = function(name,cb){
    userModel.findOne({username:name},function(err,user){
        if(err){
            return cb(err)
        }
        cb(null,user)
    })
}

module.exports = User