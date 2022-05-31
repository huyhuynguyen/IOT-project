const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const route = require('./routes/index.js')
const db = require('./config/db/firebase')
require('dotenv').config()

const app = express()
const port = 5000

// Connect to DB
// db.connect();

// Static Files
app.use(express.static('public'))

// Set Templating Engine
app.use(expressLayouts)
app.set('layout', './layouts/layout')
app.set('view engine', 'ejs')

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
route(app);

app.listen(port, '0.0.0.0' ,() => {
    console.log(`Example app listening on port ${port}`)
})