#!/usr/bin/env node

const express = require('express')
const path = require('path')
// const ejs = require('ejs')
const fs = require('fs')
const proxy = require('http-proxy-middleware')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const art = require('express-art-template')
const mongoStore = require('connect-mongo')(session)

const settings = require('./settings')
const mongoose = require('./models/mongoose')

const app = express(),
  routes = require('./routes')
app.engine('html', art);
app.set('view options', {
  debug: process.env.NODE_ENV !== 'production'
});
// app.engine('html', ejs.renderFile)
app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'html')
// app.use('/static', express.static('public'))
app.use(express.static(path.join(__dirname, 'public')))

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(session({
  secret: settings.cookieSecret,
  saveUninitialized: false,
  resave: false,
  store: new mongoStore({
    mongooseConnection: mongoose.connection,
    // url: 'mongodb://' + settings.host + ':' + settings.port + '/' + settings.db,
    touchAfter: 24 * 3600
  })
}))
/*
const ajax = axios.create({
  baseURL: 'http://localhost',
  timeout:1000*3,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'X-Requested-with':'XMLHttpRequest'
  },
  proxy:{
    host:"127.0.0.1",
    port:3005,
    auth:{
      username:'cdd',
      password:'123456'
    }
  }
})
*/
routes(app)

app.listen(3009, function () {
  console.log('Express server listening on port 3009')
})