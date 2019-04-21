const mongoose = require("mongoose")
const settings = require('../settings')
mongoose.connect('mongodb://' + settings.host + ':' + settings.port + '/' + settings.db + '',{ useNewUrlParser: true } )
const db = mongoose.connection
db.on('connected', function () {
    console.log("connected..")
})
db.on('error', function (err) {
    console.log("connected err" + err)
})
db.on('disconnected', function () {
    console.log("disconnected")
})
db.on('open', function () {
    console.log("open")
})

module.exports = mongoose
