const express = require('express')
const bodyParser = require('body-parser')

const routes = require('./routes/routes.js')

const app = express()

const jsonParser = bodyParser.json()
const urlEncoded = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'pug')

app.listen(8080)

app.use(express.static('public'))
app.use('/', routes)
