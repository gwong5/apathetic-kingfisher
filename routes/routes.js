const express = require('express')
const router = express.Router()
const records = require ('../database/database')

router.get('/', (request, response) => {
  records.getSongs()
  .then(songs => {
    response.render('index', {songs}) 
  })
})

module.exports = router
