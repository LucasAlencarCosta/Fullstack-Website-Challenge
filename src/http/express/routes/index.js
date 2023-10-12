function routes(app) {
    app.use('/auth', require('./auth'));
    app.use('/', require('./app'));
}

module.exports = routes;