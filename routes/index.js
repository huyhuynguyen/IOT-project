const dashboardRouter = require('./dashboard')
const mainRouter = require('./main')
const chartRouter = require('./chart')
const logRouter = require('./log')

const dashboardApiRouter = require('./api/dashboard')
const chartApiRouter = require('./api/chart')
const mainApiRouter = require('./api/main')
const logApiRouter = require('./api/log')

function route(app) {
    app.use('/api/log', logApiRouter)
    app.use('/api/main', mainApiRouter)
    app.use('/api/chart', chartApiRouter)
    app.use('/api', dashboardApiRouter)

    app.use('/log', logRouter)
    app.use('/chart', chartRouter)
    app.use('/main', mainRouter)
    app.use('/', dashboardRouter)
}

module.exports = route;