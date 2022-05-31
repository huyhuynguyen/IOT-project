const dashboardRouter = require('./dashboard')
const mainRouter = require('./main')
const chartRouter = require('./chart')
const logRouter = require('./log')

function route(app) {
    app.use('/log', logRouter)
    app.use('/chart', chartRouter)
    app.use('/main', mainRouter)
    app.use('/', dashboardRouter)
}

module.exports = route;