#!/usr/bin/env node

const express = require('express')
const path = require('path')
const ejs = require('ejs')
const fs = require('fs')
const axios = require('axios')
const proxy = require('http-proxy-middleware')
const app = express()
const settings = require('./settings')

var routes = require('./routes/index')

app.engine('html', ejs.renderFile)
app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'html')

app.use('/css', express.static('views/css'))
app.use('/img', express.static('views/img'))
app.use('/js', express.static('views/js'))
app.use('/page', express.static('views/page'))


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

routes(app)
app.listen(3009, function(){
  console.log('Express server listening on port 3009')
})