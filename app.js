const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.PORT || 8080

const routes = require('./routes/routes.js')

const app = express()

const jsonParser = bodyParser.json()
const urlEncoded = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'pug')

app.listen(port, () => { console.log(`listening on http://localhost:${port}`) })

app.use(express.static('public'))
app.use('/', routes)
