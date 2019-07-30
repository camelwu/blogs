const fs = require('fs'),
    Article = require('../models/article'),
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
    }

function home(req, res) {
    Article.renderArticleList('service', function (resP) {
        let footer = resP.Lists
        render(res, 'home', {
            "footer": footer,
            "Lists": footer
        })
    })
}

function channel(req, res) {
    var {
        slug
    } = req.params,
        sid = req.query.id ? req.query.id : 0;
    Article.renderArticleList('service', function (resP) {
        let footer = resP.Lists
        // 翻页
        var temp = {
                len: 0,
                Lists: []
            },
            params = {
                currentPage: 1,
                pageSize: 9
            };
        if (slug != 'aboutus' || slug != 'contactus') {
            Article.getLength({
                type: slug
            }, function (resL) {
                temp.len = resL ? resL : 0;
                Article.renderManage({
                    type: slug
                }, params, function (result) {
                    temp.Lists = result;
                    temp.sid = sid;
                    temp.footer = footer;
                    render(res, slug, temp)
                })
            })
        } else {
            render(res, slug, {
                "footer": footer
            })
        }
    })
}

function news(req, res) {
    var {
        str
    } = req.params
    Article.renderArticleList('service', function (resP) {
        let footer = resP.Lists
        if (str.length > 6) {
            Article.renderArticle(str, function (result) {
                // 推荐列表
                Article.renderArticleList({
                    type: 'news',
                    dec: true
                }, function (data) {
                    render(res, 'news-detail', {
                        "db": result,
                        "Lists": data.Lists,
                        "footer": footer
                    })
                })
            })
        } else {
            // 翻页
            var temp = {
                    len: 0,
                    Lists: []
                },
                params = {
                    currentPage: req.query.page ? req.query.page : 1,
                    pageSize: 9
                };
            Article.getLength({
                type: slug
            }, function (resL) {
                temp.len = resL ? resL : 0;
                Article.renderManage({
                    type: slug
                }, params, function (result) {
                    temp.Lists = result;
                    temp.footer = footer;
                    render(res, slug, temp)
                })
            })
        }
    })
}
/**
 * let limit = req.query.pagesize||20; //分页参数
    let currentPage = req.query.page||1; //当前页码
    let params={
        //条件查询参数
        city:req.query.city,
        education:req.query.education,
        keyword:req.query.keyword
    };
    let mp={};
    for (let i in params){
        if (params[i]!==undefined){
            mp[i]=params[i]
        }
    }
    if (currentPage < 1) {
        currentPage = 1;
    }
    console.log(mp);
    job.find({},function (err,ress) {
        if (err) return res.json({status:1,message:'请求失败'});
        let all=ress.length;
        job.find({...mp}).skip((parseInt(currentPage)-1)*parseInt(limit)).limit(parseInt(limit)).exec(function (err,docs) {
            if (err) {
                console.log(err);
                return res.json({status:1,message:'请求失败'});
            }
            return res.json({
                status:0,
                message:'请求成功',
                total:all,
                hlist:docs
            })
        })
    });

 */
function render(res, rpath, data = {}) {
    // rpath == 'news-detail' ? 'news' : rpath
    let subtitle = (rpath == 'index' || rpath == 'home') ? tit['f']['/'] : rpath == 'news-detail' ? tit['f']['news'] : tit['f'][rpath]
    exists = fs.existsSync('./views/' + rpath + '.html')
    if (exists) {
        res.render(rpath, {
            title: subtitle,
            nav: tit['f'],
            path: rpath == 'news-detail' ? 'news' : rpath,
            data: data
        })
    } else {
        res.redirect('/404')
    }
}
//导出该路由
module.exports = {
    home,
    channel,
    news
};
