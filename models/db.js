const settings = require('../settings.js')
const Db = require('mongodb').Db
const Connection = require('mongodb').Connection
const Server = require('mongodb').Server
modules.export = new Db(settings.db, newServer(settings.host, settings.port), {safe:true})
