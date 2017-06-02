const express = require('express')
const router = express.Router()
const records = require ('../database/database')

router.get('/', (request, response) => {
  response.render('index') 
})

router.get('/api/getSidebar', (request, response) => {
  Promise.all([records.getArtists(), records.getAlbums()])
  .then(info => { response.json(info) })
})

router.get('/api/getSongsOfArtist/:name', (request, response) => {
  const { name } = request.params
  records.getSongsOfArtist(name)
  .then(artistInfo => { console.log(artistInfo) })
})

router.get('/api/getAlbum/:title', (request, response) => {
  const { title } = request.params
  records.getSongsOfAlbum(title)
  .then(albumSong => { response.json(albumSong) })
})

module.exports = router
