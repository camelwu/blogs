const settings = require('../settings'),
    page = require('./front-page'),
    manager = require('./manager');

module.exports = function (app) {
    // manager center
    app.get('/' + settings.manage + '(/*)?', [manager.checkLogin, manager.handle_get])
    app.get('/logout', function (req, res) {
        req.session.user = null
        res.redirect('/login?' + Date.now())
    })
    // post & delete operation
    app.post('/article', manager.cpUpload, manager.handle_post)
    app.post('*', manager.handle_post)
    app.delete('*', [manager.checkLogin, manager.handle_delete])
    // font web
    app.get('/', page.home)
    app.get('/:slug', page.channel)
    app.get('/news/:str', page.news)
};
