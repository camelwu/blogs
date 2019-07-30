const multer = require('multer'),
    path = require('path'),
    fs = require('fs'),
    settings = require('../settings'),
    picPath = 'statics/uploads',
    storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, picPath)
        },
        filename: function (req, file, cb) {
            console.log(file.originalname) //上传文件的名字
            console.log(file.mimetype) //上传文件的类型
            console.log(file.fieldname) // 上传文件的Input的name名
            console.log(file.encoding) // 编码方式
            var fileFormat = (file.originalname).split("."); //采用分割字符串，来获取文件类型
            console.log(fileFormat)
            var extname = path.extname(file.originalname); //path下自带方法去获取文件类型
            console.log(extname);
            // cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]); //更改名字
            cb(null, file.fieldname + '-' + Date.now() + extname); //更改名字
        }
    }),
    upload = multer({
        storage: storage
    }),
    User = require('../models/user'),
    Company = require('../models/company'),
    Article = require('../models/article'),
    admin = require('../db/admin'),
    tit = {
        "b": {
            "index": "管理首页",
            "users": "用户管理",
            "settings": "关于我们",
            "articles": "文章管理"
        },
        "f": {
            "/": "首页",
            "aboutus": "关于我们",
            "service": "业务范围",
            "news": "媒体动态",
            "recruitment": "诚聘英才",
            "contactus": "联系我们",
            "faq": "常见问题"
        }
    },
    category = {
        "service": "业务范围",
        "news": "媒体动态",
        "recruitment": "诚聘英才",
        "faq": "常见问题",
    }

var cpUpload = upload.fields([{
    name: 'smallpic',
    maxCount: 1
}, {
    name: 'pic',
    maxCount: 1
}])

function checkLogin(req, res, next) {
    if (!!req.session.user) {
        next()
    } else {
        console.log('login failture')
        res.redirect('/login')
    }
}

function handle_get(req, res) {
    console.log('manage')
    var rpath, exists, uriAry = req.path.split('/'),
        db
    if (uriAry[2] == '') {
        uriAry[2] = 'settings'
    } else if (uriAry.length < 3) {
        uriAry.push('settings')
    }
    rpath = uriAry[2]
    if (rpath == 'articles') {
        subtitle = category[req.query.category]
    } else {
        subtitle = tit['b'][uriAry[2]]
    }

    exists = fs.existsSync('./views/admin/' + rpath + '.html')

    switch (rpath) {
        case 'index':
            render()
            break;
        case 'users':
            if(req.query && req.query.opera=='del'){
                if (!req.session.user.isSuper) {
                    res.redirect('back')
                    return
                }
                let _id = req.query.id
                User.deleteUser(_id, function () {
                    res.redirect('back')
                    return
                })
            }
            User.renderUserList('all', function (result) {
                dataList = result.userLists
                render(dataList)
            })
            break;
        case 'settings':
            Company.findMsg({}, function (result) {
                let data = result == null ? Company.initalC : result;
                render(data)
            })
            break;
        default:
            if(req.query && req.query.opera=='del'){
                if (!req.session.user.isSuper) {
                    res.redirect('back')
                    return
                }
                let _id = req.query.id
                Article.deleteArticle(_id, function () {
                    res.redirect('back')
                    return
                })
            }
            Article.renderArticleList(req.query.category, function (result) {
                db = result;
                if (req.query.id) {
                    Article.renderArticle(req.query.id, function (artResp) {
                        db.data = artResp;
                        render(db)
                        res.end
                    })
                } else {
                    db.data = {}
                    render(db)
                    res.end
                }
            })
            break;
    }

    function render(data = {}) {
        if (exists) {
            res.render('admin/' + rpath, {
                title: settings.project + ' - ' + subtitle,
                subtitle: subtitle,
                settings: settings,
                url: req.url.replace('/' + settings.manage, ''),
                msg: "",
                path: rpath,
                query: req.query,
                data: data
            })
        } else {
            res.status(404).send({
                error: '404!'
            });
        }
    }
}
// post请求
function handle_post(req, res) {
    const key = req.path,
        body = req.body;
    var params = {}
    switch (key) {
        case '/login':
            if (body.email == admin.email) {
                if (body.password == admin.password) {
                    req.session.user = admin
                    console.log(req.session.user)
                    res.redirect('/'+settings.manage)
                } else {
                    res.redirect('back')
                    res.end
                }
            } else {
                User.findUser({
                    email: body.email,
                    password: body.password
                }, function (user) {
                    if (user && user !== {} && user.userLists.length > 0) {
                        req.session.user = user.userLists[0]
                        res.redirect('/'+settings.manage)
                    } else {
                        res.redirect('back')
                        res.end
                    }
                })
            }
            break;
        case '/signup':
            if (!req.session.user.isSuper) {
                res.redirect('back')
                return
            }
            User.findUser({
                email: body.email
            }, function (data) {
                if (data && data !== {} && data.userLists.length > 0) {
                    // console.log(data)
                    res.redirect('back')
                } else {
                    User.saveUser({
                        "username": body.username,
                        "email": body.email,
                        "password": body.password,
                        isSuper: false
                    }, function (result) {
                        // req.session.user = user
                        res.redirect('/'+settings.manage+'/users')
                    })
                }
            })
            break;
        case '/settings':
            params = {
                "name": body.name,
                "tel": body.tel,
                "email": {
                    "bp": body['bp-email'],
                    "job": body['job-email'],
                    "info": body['info-email']
                },
                "address": body.address,
                "introduction": body.introduction,
                "keywords": body.keywords.replace(/，/g, ','),
                "description": body.description,
                "cover": {}
            }
            if (body.params_id) {
                var _id = body.params_id.slice(1, body.params_id.length - 1)
                // _id = _id.replace("'", '')
                Company.saveMsg(_id, params, function (result) {
                    res.redirect('/'+settings.manage+'/settings')
                })
            } else {
                Company.saveMsg(0, params, function (result) {
                    // if(result!=null){ }
                    res.redirect('/'+settings.manage+'/settings')
                })
            }
            break;
        case '/article':
            params = {
                author: req.session.user.username,
                type: body.type,
                label: '',
                title: body.title,
                keywords: body.keywords,
                content: body.content,
                text: body.text,
                delta: {},
                pv: 0,
                rec: body.rec ? true : false
            }
            req.files.smallpic ? params.smallpic = req.files.smallpic[0].filename : null;
            req.files.pic ? params.pic = req.files.pic[0].filename : null;
            if (body.params_id) {
                var _id = body.params_id.slice(1, body.params_id.length - 1)
                _id = _id.replace(/"/g, '')
                Article.saveArticle(_id, params, function (result) {
                    res.redirect('back')
                })
            } else {
                Article.saveArticle(0, params, function (result) {
                    // if(result!=null){ }
                    res.redirect('back')
                })
            }
            break;
        default:
            break;
    }
}
// delete请求
function handle_delete(req, res) {
    const key = req.path,
        mime = "application/json;charset=utf-8",
        body = req.body
    // res.writeHead(200, { "Content-Type": mime });
    switch (key) {
        case '/user':
            User.deleteUser(body._id, function () {
                res.writeHead(200, {
                    "Content-Type": mime
                });
                res.send({
                    code: 0,
                    msg: 'delete user'
                })
            })
            break;
        default: // article
            if (body.email == admin.email) {
                req.session.user = admin
                res.redirect('/'+settings.manage+'/')
            } else {
                User.findUser({
                    email: body.email,
                    password: body.password
                }, function (user) {
                    if (user && user.hasOwnerProperty('userLists') && user.userLists.length > 0) {
                        res.redirect('back')
                    }
                    req.session.user = user
                    res.redirect('/'+settings.manage+'/')
                })
            }

            // man(username,function(user){console.log(user)})
            // UserModel.findOne({username:username}).then((user)=>{
            //   if(!user){
            //     req.session.user = ''
            //     return res.send({code:'10404',msg:'用户不存在'})
            //   }
            //   if(user.password !== password){
            //     req.session.user = ''
            //     return res.send({code:'10403',msg:"密码错误"})
            //   }
            //   req.session.user = user
            //   if(user.isSuper){
            //     return res.send({code:0, msg:'ok',isSuper: true})
            //   }
            //   res.send({code:0, msg:'ok',isSuper: false})
            // }).catch((err)=>{
            //   res.send({code:'10500', msg:"system err"})
            // })
            break;
    }
}
//导出该路由
module.exports = {
    checkLogin,
    cpUpload,
    handle_get,
    handle_post,
    handle_delete
};
